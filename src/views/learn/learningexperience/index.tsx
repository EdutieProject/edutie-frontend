import {BottomNavigation, BottomNavigationAction, Box, useTheme} from "@mui/material";
import NavLayout from "src/views/common/NavLayout";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {navSections} from "src/features/navigation/navigationPath";
import {useLocation, useParams} from "react-router";
import {Activity, ApiError, LearningExperience} from "src/services/types";
import LoadingView from "src/views/common/LoadingView";
import {getLearningExperienceById} from "src/services/learning/learningExperienceService";
import ErrorView from "src/views/common/ErrorView";
import LearningNotesComponent from "src/views/learn/learningexperience/LearningNotes";
import ActivityRouter from "src/views/learn/learningexperience/activities/ActivityRouter";
import {OutputData} from "@editorjs/editorjs";

enum ActiveViewPart {
    NOTES = "NOTES",
    ACTIVITY = "ACTIVITY"
}

function ViewPartSwitch({activePart, switchView}: {
    activePart: ActiveViewPart,
    switchView: Dispatch<SetStateAction<ActiveViewPart>>
}) {
    return (
        <Box sx={{position: "fixed", bottom: 80, width: "100%", display: "grid", placeItems: "center", zIndex: 50}}>
            <BottomNavigation
                showLabels
                value={activePart}
                onChange={(e, newValue) => switchView(newValue)}
            >
                <BottomNavigationAction label={"Notes"} value={ActiveViewPart.NOTES}/>
                <BottomNavigationAction label={"Activity"} value={ActiveViewPart.ACTIVITY}/>
            </BottomNavigation>
        </Box>
    );
}

export default function LearningExperienceView() {
    const theme = useTheme();
    const location = useLocation();

    //TODO: this does not work as the link is of different name
    const {cachedLearningExperience} = (location.state ?? {}) as {
        cachedLearningExperience: LearningExperience<Activity>
    };
    const {learningExperienceId} = useParams<{ learningExperienceId: string }>();

    const [activeViewPart, setActiveViewPart] = useState<ActiveViewPart>(ActiveViewPart.NOTES);
    const [learningExperience, setLearningExperience] = useState<LearningExperience<Activity>>(cachedLearningExperience);

    const [cachedSolution, setCachedSolution] = useState<OutputData>();
    const [learningResultLoading, setLearningResultLoading] = useState(false);
    const [error, setError] = useState<ApiError>()

    async function loadLearningExperience() {
        const response = await getLearningExperienceById(learningExperienceId as string);
        if (!response.success) {
            setError(error);
            return;
        }
        setLearningExperience(response.data);
    }

    useEffect(() => {
        loadLearningExperience().then();
    }, [learningExperience === undefined]);


    if (error)
        return <ErrorView error={error}/>

    if (learningExperience === null || learningExperience === undefined || learningResultLoading) {
        return <LoadingView/>
    }

    return (
        <NavLayout activeSectionIdOverride={navSections.home} variant={"view"} relative={true}>
            {
                activeViewPart === ActiveViewPart.NOTES ?
                    <LearningNotesComponent notes={learningExperience.notes}/>
                    :
                    <ActivityRouter
                        activity={learningExperience.activity}
                        setLearningResultLoading={setLearningResultLoading}
                        learningExperienceId={learningExperience.id}
                        setError={setError}
                        setCachedSolution={setCachedSolution}
                        cachedSolution={cachedSolution}
                    />
            }
            <ViewPartSwitch activePart={activeViewPart} switchView={setActiveViewPart}/>
        </NavLayout>
    );
}
