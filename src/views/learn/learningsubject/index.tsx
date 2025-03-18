import {Button, Container, Step, StepLabel, Stepper, Typography, useTheme} from "@mui/material";
import Grid from '@mui/material/Grid2';
import NavLayout from "src/views/common/NavLayout";
import React, {useEffect, useState} from "react";
import {navSections} from "src/features/navigation/navigationPath";

import {RadioRounded} from "@mui/icons-material";
import {useParams} from "react-router";
import {LearningSubjectLearningView} from "src/services/types";
import {getLearningSubjectById} from "src/services/learning/learningSubjectService";
import LoadingView from "src/views/common/LoadingView";


export default function LearningSubjectLearnView() {
    const theme = useTheme();
    const {learningSubjectId} = useParams<{ learningSubjectId: string }>();

    const [learningSubjectView, setLearningSubjectView] = useState<LearningSubjectLearningView>();
    const [selectedRequirementIdx, setSelectedRequirementIdx] = useState<number>(0);


    async function loadLearningSubject() {
        const response = await getLearningSubjectById(learningSubjectId as string);
        if (!response.success)
            return; //TODO error handling
        setLearningSubjectView(response.data);
    }

    useEffect(() => {
        loadLearningSubject().then();
    }, [learningSubjectView === undefined]);

    if (learningSubjectView === null || learningSubjectView === undefined) {
        return <LoadingView/>
    }

    async function handleCreateLearningExperience(knowledgeSubjectId: string) {
        //todo
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
                        <Button variant={"contained"} color={"secondary"}>Let's Learn</Button>

                    </Grid>
                </Grid>
            </Container>
        </NavLayout>
    );
}
