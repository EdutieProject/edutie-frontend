import {Autocomplete, Box, Container, TextField, Typography, useTheme} from "@mui/material";
import NavLayout from "src/views/common/NavLayout";
import React, {useEffect, useState} from "react";
import {navigationPath, navSections} from "src/features/navigation/navigationPath";
import Grid from "@mui/material/Grid2";
import {ApiError, LearningSubject} from "src/services/types";
import {getCreatedLearningSubjects} from "src/services/management/learningSubjectService";
import LoadingView from "src/views/common/LoadingView";
import ErrorView from "src/views/common/ErrorView";
import {RadioRounded} from "@mui/icons-material";
import {useNavigate} from "react-router";

export default function LearnHomeView() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [error, setError] = useState<ApiError>();

    const [learningSubjects, setLearningSubjects] = useState<Array<LearningSubject>>();

    async function fetchLearningSubjects() {
        const response = await getCreatedLearningSubjects();
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
                options={[
                    {label: 'The Shawshank Redemption', year: 1994},
                    {label: 'The Godfather', year: 1972},
                    {label: 'The Godfather: Part II', year: 1974},
                    {label: 'The Dark Knight', year: 2008},
                    {label: '12 Angry Men', year: 1957},
                ]}
                sx={{width: {xs: "100%", md: "80%", lg: "40%"}, my: 4}}
                renderInput={(params) => <TextField {...params} label="What would you like to learn?"/>}
            />
            <Container maxWidth={"xl"}>
                <Grid container width={"100%"} spacing={6}>
                    {
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
                                    }} onClick={() => navigate(navigationPath.fillPath(navigationPath.learningSubjectLearn, o.id))}>
                                        <RadioRounded/>
                                        <Box sx={{display: "flex", flexDirection: "column"}}>
                                            <Typography variant={"h6"}>{o.name}</Typography>
                                            <Typography variant={"subtitle1"} color={"textSecondary"}>Create a learning subject with
                                                requirements you can learn from.</Typography>
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
