import {BottomNavigation, BottomNavigationAction, Box, Button, useTheme} from "@mui/material";
import NavLayout from "src/views/common/NavLayout";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {navSections} from "src/features/navigation/navigationPath";
import {useLocation, useParams} from "react-router";
import {Activity, LearningExperience} from "src/services/types";
import LoadingView from "src/views/common/LoadingView";
import {getLearningExperienceById} from "src/services/learning/learningExperienceService";
import ErrorView from "src/views/common/ErrorView";
import LearningNotesComponent from "src/views/learn/learningexperience/LearningNotes";

enum ActiveViewPart {
    NOTES = "NOTES",
    ACTIVITY = "ACTIVITY"
}

function ViewPartSwitch({activePart, switchView}: {
    activePart: ActiveViewPart,
    switchView: Dispatch<SetStateAction<ActiveViewPart>>
}) {
    return (
        <Box sx={{position: "fixed", bottom: 80, width: "100%", display: "grid", placeItems: "center"}}>
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
    const {cachedLearningExperience} = location.state as { cachedLearningExperience: LearningExperience<Activity> };
    const {learningExperienceId} = useParams<{ learningExperienceId: string }>();

    const [activeViewPart, setActiveViewPart] = useState<ActiveViewPart>(ActiveViewPart.NOTES);
    const [learningExperience, setLearningExperience] = useState<LearningExperience<Activity>>(cachedLearningExperience);

    console.log(cachedLearningExperience);
    console.log(learningExperienceId);
    console.log(learningExperience);


    async function loadLearningExperience() {
        const response = await getLearningExperienceById(learningExperienceId as string);
        if (!response.success)
            return <ErrorView error={response.error}/>;
        setLearningExperience(response.data);
    }

    useEffect(() => {
        loadLearningExperience().then();
    }, [learningExperience === undefined]);

    if (learningExperience === null || learningExperience === undefined) {
        return <LoadingView/>
    }


    console.log(learningExperience);

    return (
        <NavLayout activeSectionIdOverride={navSections.home} variant={"view"} relative={true}>
            {
                activeViewPart === ActiveViewPart.NOTES ?
                    <LearningNotesComponent notes={learningExperience.notes}/>
                    :
                    <></>
            }
            <ViewPartSwitch activePart={activeViewPart} switchView={setActiveViewPart}/>
        </NavLayout>
    );
}
