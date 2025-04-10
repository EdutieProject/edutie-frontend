import {Box, Button, Container, Typography, useTheme} from "@mui/material";
import NavLayout from "src/views/common/NavLayout";
import React, {useEffect, useState} from "react";
import {navigationPath, navSections} from "src/features/navigation/navigationPath";
import {useLocation, useNavigate, useParams} from "react-router";
import {ApiError, LearningResultViewData} from "src/services/types";
import LoadingView from "src/views/common/LoadingView";
import ErrorView from "src/views/common/ErrorView";
import {getLearningResultById} from "src/services/learning/learningResultService";
import cool from "src/assets/svg/emoji/cool.svg"
import Grid from "@mui/material/Grid2";
import {createSimilarLearningExperience} from "src/services/learning/learningExperienceService";
import LearningSubjectIcon from "src/components/icons/LearningSubjectIcon";
import MarkdownLaTeXRenderer from "src/components/renderers/MarkdownLaTexRenderer";


export default function LearningResultView() {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const {cachedLearningResult} = (location.state ?? {}) as {
        cachedLearningResult: LearningResultViewData<any>
    };
    const {learningResultId} = useParams<{ learningResultId: string }>();

    const [learningResultViewData, setLearningResultViewData] = useState<LearningResultViewData<any>>(cachedLearningResult);

    const [error, setError] = useState<ApiError>();

    const [similarLearningExperienceLoading, setSimilarLearningExperienceLoading] = useState<boolean>(false);

    useEffect(() => {
        loadLearningResult().then();
    }, [learningResultViewData === undefined]);

    async function loadLearningResult() {
        const response = await getLearningResultById(learningResultId as string);
        if (!response.success) {
            setError(response.error);
            return;
        }
        setLearningResultViewData(response.data);
    }

    function getTotalMasteryPoints() {
        return learningResultViewData.learningResult.learningEvaluation.assessments
            .map(o => o.masteryPointsAmount)
            .reduce(function (x, y) {
                return x + y;
            }, 0);
    }

    async function handleCreateSimilarLearningExperience() {
        setSimilarLearningExperienceLoading(true);
        const response = await createSimilarLearningExperience(learningResultViewData.learningResult.learningExperienceId);
        if (!response.success) {
            setError(response.error);
            return;
        }
        navigate(navigationPath.fillPath(navigationPath.learningExperience, response.data.id), {state: {learningExperience: response.data}});
    }

    function handleGoToSource() {
        navigate(navigationPath.fillPath(navigationPath.learningSubjectLearn, learningResultViewData.sourceId));
    }

    console.log(error);

    if (error)
        return <ErrorView error={error}/>

    if (learningResultViewData === null || learningResultViewData === undefined || similarLearningExperienceLoading) {
        return <LoadingView/>
    }

    console.log(learningResultViewData);

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
                        {learningResultViewData.learningResult.learningEvaluation.assessments.map(o =>
                            <Box sx={{
                                display: "flex",
                                gap: 2,
                                width: "18rem",
                                cursor: "pointer",
                                "&:hover": {
                                    "& .learning-subject-title": {color: theme.palette.primary.main}
                                }
                            }} onClick={handleGoToSource}>
                                <LearningSubjectIcon/>
                                <Box sx={{display: "flex", flexDirection: "column"}}>
                                    <Typography variant={"h5"} className={"learning-subject-title"}>{learningResultViewData.currentSourceName}</Typography>
                                    <Typography variant={"subtitle1"}>
                                        {o.elementalRequirementSnapshot.title}
                                    </Typography>
                                    <Typography variant={"subtitle2"} color={"textSecondary"}>
                                        {o.masteryPointsAmount} mastery points
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                    </Grid>
                    <Grid size={{xs: 12, md: 8}}>
                        {learningResultViewData.learningResult.learningEvaluation.assessments.map(o =>
                            <Box sx={{display: "flex", alignItems: "center"}}>
                                <Typography>
                                    <MarkdownLaTeXRenderer content={o.feedback.text}/>
                                </Typography>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Container>
            <Box sx={{
                position: "fixed",
                width: " 100%",
                left: 0,
                bottom: 150,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
                zIndex: 50
            }}>
                <Button variant={"outlined"} onClick={handleGoToSource}>Go back to
                    source</Button>
                <Button variant={"contained"} onClick={handleCreateSimilarLearningExperience}>Continue learning</Button>
            </Box>
        </NavLayout>
    );
}
