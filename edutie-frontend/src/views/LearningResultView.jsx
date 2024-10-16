import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavLayout from "./layout/NavLayout";
import { Box, Grid, LinearProgress, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { generateLearningResource, getLearningResultById } from "../services/LearningService";
import ErrorView from "./common/ErrorView";
import JoyColorfulFaceIcon from "../components/customIcons/JoyColorfulFaceIcon";
import SadColorfulFaceIcon from "../components/customIcons/SadColorfulFaceIcon";
import NormalColorfulFaceIcon from "../components/customIcons/NormalColorfulFaceIcon";
import LoadingView from "./common/LoadingView";
import MarkdownLaTeXRenderer from "../components/markdown/MarkdownLaTexRenderer";
import RoundedButton from "../components/global/RoundedButton";
import { navigationPath } from "../features/navigation";
import { getActiveLessonId } from "../features/storage/activeLessonCache";


export default function LearningResultView() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { resultId } = useParams();
    const { state } = useLocation();
    const [learningResult, setLearningResult] = useState(state);
    const [error, setError] = useState(null);

    const [exerciseLoading, setExerciseLoading] = useState(false);

    console.log(learningResult);

    useEffect(() => {
        if (learningResult != null) {
            console.log("Learning result supplied. No fetching invoked");
            return;
        }
        getLearningResultById(resultId)
            .then(learningResultResponse => {
                console.log(learningResultResponse);
                setLearningResult(learningResultResponse.data);
                setError(learningResultResponse.error);
            });
    }, []);

    // exercise creation effect
    useEffect(() => {
        if (exerciseLoading === false)
            return;
        generateLearningResource(learningResult.learningResourceDefinitionId)
            .then((learningResourceResponse => {
                if (learningResourceResponse.success === false) {
                    setError(learningResourceResponse.error);
                    setExerciseLoading(false);
                    return;
                }
                console.log(learningResourceResponse);
                navigate(navigationPath.fillPath(navigationPath.exercise, learningResourceResponse.data.id), { state: learningResourceResponse.data });
            }));
    }, [exerciseLoading]);

    const getHeading = (feedbackType) => feedbackType === "POSITIVE" ? "Świetnie!" : feedbackType === "NEGATIVE" ? "Słabo..." : "W porządku.";

    const iconSize = "24rem";
    const getIcon = (feedbackType) => feedbackType === "POSITIVE" ? <JoyColorfulFaceIcon width={iconSize} height={iconSize} />
        : feedbackType === "NEGATIVE" ? <SadColorfulFaceIcon width={iconSize} height={iconSize} />
            : <NormalColorfulFaceIcon width={iconSize} height={iconSize} />;

    if (error)
        return <ErrorView error={error} />

    if (learningResult == null || exerciseLoading)
        return <LoadingView />

    return (
        <NavLayout mode="flex" scroll>
            <Grid container flexGrow={1}>
                <Grid item xs={6} >
                    <Box sx={{ position: "fixed", display: "grid", placeItems: "center", height: "100vh", width: "40%" }}>
                        <Box sx={{ transform: "translateY(-20%)" }}>{getIcon(learningResult.feedback.type)}</Box>
                    </Box>
                </Grid>
                <Grid item xs={6} sx={{ padding: theme.spacing(4) }}>
                    <Typography variant="h3" color="grey">
                        {getHeading(learningResult.feedback.type)}
                    </Typography>
                    <MarkdownLaTeXRenderer content={learningResult.feedback.text} />
                    {
                        learningResult.assessments.map(assessment =>
                            <Box sx={{ marginTop: theme.spacing(4) }}>
                                <Typography variant="h5">{assessment.learningRequirementName}</Typography>
                                <Box sx={{ display: "flex", gap: theme.spacing(2) }}>
                                    <Typography variant="h4" sx={{ display: "grid", placeItems: "center" }}>Ocena: {assessment.grade}</Typography>
                                    <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                                        <LinearProgress
                                            color="primary"
                                            variant="determinate"
                                            value={assessment.grade / 6 * 100}
                                            sx={{ width: "100%", height: 10, borderRadius: theme.shape.borderRadius }}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", gap: theme.spacing(2) }}>
                                    <Typography variant="h4" sx={{ display: "grid", placeItems: "center" }}>Trudność: {(assessment.difficultyFactor * 100)}%</Typography>
                                    <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                                        <LinearProgress
                                            color="secondary"
                                            variant="determinate"
                                            value={assessment.difficultyFactor * 100}
                                            sx={{ width: "100%", height: 10, borderRadius: theme.shape.borderRadius }}
                                        />
                                    </Box>
                                </Box>
                                <MarkdownLaTeXRenderer content={assessment.feedbackText} />
                            </Box>
                        )
                    }
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: theme.spacing(4), marginY: theme.spacing(6) }}>
                        <RoundedButton label="Wróć do drzewka" onClick={() => navigate(navigationPath.fillPath(navigationPath.segmentTree, getActiveLessonId()))} />
                        <RoundedButton label="Spróbuj jeszcze raz" active onClick={() => setExerciseLoading(true)} />
                    </Box>
                </Grid>
            </Grid>
        </NavLayout>
    );
}