import {Box, Container, Typography, useTheme} from "@mui/material";
import NavLayout from "src/views/common/NavLayout";
import React, {useEffect, useState} from "react";
import {navigationPath, navSections} from "src/features/navigation/navigationPath";
import {useLocation, useParams} from "react-router";
import {ApiError, LearningResult} from "src/services/types";
import LoadingView from "src/views/common/LoadingView";
import ErrorView from "src/views/common/ErrorView";
import {getLearningResultById} from "src/services/learning/learningResultService";
import cool from "src/assets/svg/emoji/cool.svg"
import Grid from "@mui/material/Grid2";
import {RadioRounded} from "@mui/icons-material";


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

    function getTotalMasteryPoints() {
        return learningResult.learningEvaluation.assessments
            .map(o => o.masteryPointsAmount)
            .reduce(function (x, y) {
                return x + y;
            }, 0);
    }

    useEffect(() => {
        loadLearningResult().then();
    }, [learningResult === undefined]);


    if (error)
        return <ErrorView error={error}/>

    if (learningResult === null || learningResult === undefined) {
        return <LoadingView/>
    }

    console.log(learningResult);

    return (
        <NavLayout activeSectionIdOverride={navSections.home} variant={"view"} relative={true}>
            <Box sx={{display: "flex", gap: 4, flexWrap: "wrap", alignItems: "center", mb: 8}}>
                <img src={cool} alt={"cool"} width={"150"}/>
                <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                    <Typography variant={"h4"}>Well learned</Typography>
                    <Typography>You gained <b><span
                        style={{color: theme.palette.primary.main}}>{getTotalMasteryPoints()}</span> mastery points.</b></Typography>
                </Box>
            </Box>
            <Container maxWidth={"lg"}>
                <Grid container>
                    <Grid size={{xs: 12, md: 4}} sx={{display: "flex", flexDirection: "column", gap: 2}}>
                        {learningResult.learningEvaluation.assessments.map(o =>
                            <Box sx={{
                                display: "flex",
                                gap: 2,
                                width: "18rem",
                                cursor: "pointer",
                                "&:hover": {
                                    "& .learning-subject-title": {color: theme.palette.primary.main}
                                }
                            }} onClick={() => console.log("hey")}>
                                <RadioRounded/>
                                <Box sx={{display: "flex", flexDirection: "column"}}>
                                    <Typography variant={"h5"}>{o.elementalRequirementSnapshot.title}</Typography>
                                    <Typography variant={"subtitle1"} color={"textSecondary"}>{o.masteryPointsAmount} mastery points</Typography>
                                </Box>
                            </Box>
                        )}
                    </Grid>
                    <Grid size={{xs: 12, md: 8}}>
                        {learningResult.learningEvaluation.assessments.map(o =>
                            <Box sx={{display: "flex", alignItems: "center"}}>
                                <Typography>{o.feedback.text}</Typography>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </NavLayout>
    );
}
