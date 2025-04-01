import {Autocomplete, Box, Container, TextField, Typography, useTheme} from "@mui/material";
import NavLayout from "src/views/common/NavLayout";
import React, {useEffect, useState} from "react";
import {navigationPath, navSections} from "src/features/navigation/navigationPath";
import Grid from "@mui/material/Grid2";
import {ApiError, LearningSubject} from "src/services/types";
import LoadingView from "src/views/common/LoadingView";
import ErrorView from "src/views/common/ErrorView";
import {useNavigate} from "react-router";
import LearningSubjectIcon from "src/components/icons/LearningSubjectIcon";
import straightFaceEmoji from "src/assets/svg/emoji/expressionless.svg";
import {getCreatedEligibleLearningSubjects} from "src/services/learning/learningSubjectService";

export default function LearnHomeView() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [error, setError] = useState<ApiError>();

    const [learningSubjects, setLearningSubjects] = useState<Array<LearningSubject>>();

    async function fetchLearningSubjects() {
        const response = await getCreatedEligibleLearningSubjects();
        if (!response.success) {
            setError(response.error);
            return;
        }
        setLearningSubjects(response.data);
    }

    useEffect(() => {
        fetchLearningSubjects().then();
    }, []);

    if (error) {
        return <ErrorView error={error}/>
    }

    if (learningSubjects === undefined) {
        return <LoadingView/>
    }

    return (
        <NavLayout activeSectionIdOverride={navSections.home} variant={"home"}>
            <Typography variant={"h3"} sx={{mt: 1}}><b>Let's learn.</b></Typography>
            <Autocomplete
                disablePortal
                options={[]}
                sx={{width: {xs: "100%", md: "80%", lg: "40%"}, my: 4}}
                renderInput={(params) => <TextField {...params} label="What would you like to learn?"/>}
            />
            <Container maxWidth={"xl"}>
                <Grid container width={"100%"} spacing={6}>
                    {
                        learningSubjects.length === 0 ? (
                                <Box sx={{
                                    width: "100%",
                                    my: 2,
                                    py: 4,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 2
                                }}>
                                    <img src={straightFaceEmoji} alt={""} width={"100px"}/>
                                    <Typography variant={"h4"} sx={{mb: 1, textAlign: "center"}}><b>Nothing to be seen
                                        here.</b></Typography>
                                    <Typography sx={{mb: 1, textAlign: "center"}}>None of your learning subjects are
                                        eligible for learning.</Typography>
                                </Box>
                            ) :
                            learningSubjects.map(o => {
                                return (
                                    <Grid size={{xs: 12, md: 4}}>
                                        <Box sx={{
                                            boxSizing: "border-box",
                                            p: 4,
                                            display: "flex",
                                            borderRadius: 1,
                                            border: "1px solid lightgray",
                                            gap: 2,
                                            width: "100%",
                                            cursor: "pointer",
                                            transition: "200ms ease",
                                            "&:hover": {
                                                boxShadow: theme.shadows[2]
                                            }
                                        }}
                                             onClick={() => navigate(navigationPath.fillPath(navigationPath.learningSubjectLearn, o.id))}>
                                            <LearningSubjectIcon/>
                                            <Box sx={{display: "flex", flexDirection: "column"}}>
                                                <Typography variant={"h6"}>{o.name}</Typography>
                                                <Typography variant={"subtitle1"} color={"textSecondary"}>Learning
                                                    Subject</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                );
                            })
                    }

                </Grid>
            </Container>

        </NavLayout>
    );
}
