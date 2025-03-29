import {Button, Container, Step, StepLabel, Stepper, Typography, useTheme} from "@mui/material";
import Grid from '@mui/material/Grid2';
import NavLayout from "src/views/common/NavLayout";
import React, {useEffect, useState} from "react";
import {navigationPath, navSections} from "src/features/navigation/navigationPath";

import {RadioRounded} from "@mui/icons-material";
import {useNavigate, useParams} from "react-router";
import {ApiError, LearningSubjectLearningView} from "src/services/types";
import {getLearningSubjectById} from "src/services/learning/learningSubjectService";
import LoadingView from "src/views/common/LoadingView";
import {createLearningExperience} from "src/services/learning/learningExperienceService";
import ErrorView from "src/views/common/ErrorView";


export default function LearningSubjectLearnView() {
    const theme = useTheme();
    const navigate = useNavigate();
    const {learningSubjectId} = useParams<{ learningSubjectId: string }>();
    const [error, setError] = useState<ApiError>();

    const [learningSubjectView, setLearningSubjectView] = useState<LearningSubjectLearningView>();
    const [selectedRequirementIdx, setSelectedRequirementIdx] = useState<number>(0);
    const [learningExperienceLoading, setLearningExperienceLoading] = useState(false);

    async function handleCreateLearningExperience() {
        setLearningExperienceLoading(true);
        const response = await createLearningExperience(learningSubjectId as string, null);
        if (!response.success) {
            setError(response.error);
            return;
        }
        navigate(navigationPath.fillPath(navigationPath.learningExperience, response.data.id), {state: {learningExperience: response.data}})
    }

    async function loadLearningSubject() {
        const response = await getLearningSubjectById(learningSubjectId as string);
        if (!response.success) {
            setError(response.error);
            return;
        }
        setLearningSubjectView(response.data);
    }

    useEffect(() => {
        loadLearningSubject().then();
    }, [learningSubjectView === undefined]);

    if (error)
        return <ErrorView error={error}/>;
    if (learningSubjectView === null || learningSubjectView === undefined || learningExperienceLoading) {
        return <LoadingView/>
    }

    console.log(learningSubjectView);

    return (
        <NavLayout activeSectionIdOverride={navSections.home} variant={"view"}>
            <Container sx={{mt: 2}}>
                <Typography variant={"h3"} sx={{mb: 4}}>
                    <RadioRounded sx={{mr: 2}}/>
                    {learningSubjectView.learningSubject.name}
                </Typography>
                <Grid container spacing={6} sx={{marginTop: 2}}>
                    <Grid size={{xs: 12, md: 4}} sx={{padding: {xs: 1, md: 3}}}>
                        <Stepper orientation={"vertical"}>
                            {
                                learningSubjectView.learningSubject.requirements.map(o =>
                                    <Step
                                        key={o.id}
                                        onClick={() => setSelectedRequirementIdx(o.ordinal)}
                                        active={o.ordinal === selectedRequirementIdx}
                                    >
                                        <StepLabel>{o.title}</StepLabel>
                                    </Step>
                                )
                            }
                        </Stepper>
                    </Grid>
                    <Grid size={{xs: 12, md: 8}}>
                        <Typography variant={"h4"} sx={{mb: 4}}>Learn</Typography>
                        <Button variant={"contained"} color={"secondary"} onClick={handleCreateLearningExperience}>Let's
                            Learn</Button>
                    </Grid>
                </Grid>
            </Container>
        </NavLayout>
    );
}
