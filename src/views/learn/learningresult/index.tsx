import {BottomNavigation, BottomNavigationAction, Box, useTheme} from "@mui/material";
import NavLayout from "src/views/common/NavLayout";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {navSections} from "src/features/navigation/navigationPath";
import {useLocation, useParams} from "react-router";
import {Activity, ApiError, LearningExperience, LearningResult} from "src/services/types";
import LoadingView from "src/views/common/LoadingView";
import {getLearningExperienceById} from "src/services/learning/learningExperienceService";
import ErrorView from "src/views/common/ErrorView";
import LearningNotesComponent from "src/views/learn/learningexperience/LearningNotes";
import ActivityRouter from "src/views/learn/learningexperience/activities/ActivityRouter";
import {getLearningResultById} from "src/services/learning/learningResultService";



export default function LearningResultView() {
    const theme = useTheme();
    const location = useLocation();

    const {cachedLearningResult} = (location.state ?? {}) as {
        cachedLearningResult: LearningResult<any>
    };
    const {learningResultId} = useParams<{ learningResultId: string }>();

    const [learningResult, setLearningResult] = useState<LearningResult<any>>(cachedLearningResult);

    const [error, setError] = useState<ApiError>()

    async function loadLearningResult() {
        const response = await getLearningResultById(learningResultId as string);
        if (!response.success) {
            setError(error);
            return;
        }
        setLearningResult(response.data);
    }

    useEffect(() => {
        loadLearningResult().then();
    }, [learningResult === undefined]);


    if (error)
        return <ErrorView error={error}/>

    if (learningResult === null || learningResult === undefined) {
        return <LoadingView/>
    }

    return (
        <NavLayout activeSectionIdOverride={navSections.home} variant={"view"} relative={true}>
            {learningResult.learningEvaluation.assessments.map(o => <Box>
                {o.feedback.text}
            </Box>)}
        </NavLayout>
    );
}
