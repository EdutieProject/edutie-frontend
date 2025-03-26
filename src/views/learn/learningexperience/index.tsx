import {useTheme} from "@mui/material";
import NavLayout from "src/views/common/NavLayout";
import React, {useEffect, useState} from "react";
import {navSections} from "src/features/navigation/navigationPath";
import {useLocation, useParams} from "react-router";
import {Activity, LearningExperience} from "src/services/types";
import LoadingView from "src/views/common/LoadingView";
import {getLearningExperienceById} from "src/services/learning/learningExperienceService";
import ErrorView from "src/views/common/ErrorView";


export default function LearningExperienceView() {
    const theme = useTheme();
    const location = useLocation();
    const {cachedLearningExperience} = location.state as { cachedLearningExperience: LearningExperience<Activity> };
    const {learningExperienceId} = useParams<{ learningExperienceId: string }>();

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
        <NavLayout activeSectionIdOverride={navSections.home} variant={"view"}>
            {learningExperience.notes.paragraphs[0].content.text}
        </NavLayout>
    );
}
