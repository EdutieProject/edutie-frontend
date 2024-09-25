import { useLocation, useParams } from "react-router-dom";
import NavLayout from "./layout/NavLayout";
import { Box, Grid, LinearProgress, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { getLearningResultById } from "../services/LearningService";
import ErrorView from "./common/ErrorView";
import JoyColorfulFaceIcon from "../components/customIcons/JoyColorfulFaceIcon";
import SadColorfulFaceIcon from "../components/customIcons/SadColorfulFaceIcon";
import NormalColorfulFaceIcon from "../components/customIcons/NormalColorfulFaceIcon";
import LoadingView from "./common/LoadingView";
import MarkdownLaTeXRenderer from "../components/markdown/MarkdownLaTexRenderer";


export default function LearningResultView() {
    const theme = useTheme();
    const { resultId } = useParams();
    const { state } = useLocation();
    const [learningResult, setLearningResult] = useState(state);
    const [error, setError] = useState(null);

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

    const getHeading = (feedbackType) => feedbackType === "POSITIVE" ? "Świetnie!" : feedbackType === "NEGATIVE" ? "Słabo..." : "W porządku.";

    const iconSize = "24rem";
    const getIcon = (feedbackType) => feedbackType === "POSITIVE" ? <JoyColorfulFaceIcon width={iconSize} height={iconSize} />
        : feedbackType === "NEGATIVE" ? <SadColorfulFaceIcon width={iconSize} height={iconSize} />
            : <NormalColorfulFaceIcon width={iconSize} height={iconSize} />;

    if (error)
        return <ErrorView error={error} />

    if (learningResult == null)
        return <LoadingView />

    return (
        <NavLayout mode="flex" scroll>
            <Grid container flexGrow={1}>
                <Grid item xs={6} >
                    <Box sx={{position: "fixed", display: "grid", placeItems: "center", height: "100vh", width: "40%"}}>
                        <Box sx={{ transform: "translateY(-20%)" }}>{getIcon(learningResult.feedback.type)}</Box>
                    </Box>
                </Grid>
                <Grid item xs={6} sx={{ padding: theme.spacing(4) }}>
                    <Typography variant="h3" color="grey">
                        {getHeading(learningResult.feedback.type)}
                    </Typography>
                    <MarkdownLaTeXRenderer content={learningResult.feedback.text} />
                    {
                        learningResult.assessments.map(assessment => {
                            let learningReq = learningResult.learningResourceDefinition.learningRequirements.filter(o => o.id === assessment.learningRequirementId)[0];

                            let qualifiedSubReqs = assessment.qualifiedSubRequirements.length;
                            let allSubReqs = learningReq.subRequirements.length;
                            return (
                                <Box sx={{ marginTop: theme.spacing(4) }}>
                                    <Typography variant="h5">{learningReq.name}</Typography>
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
                                        <Typography variant="h4" sx={{ display: "grid", placeItems: "center" }}>Trudność: {qualifiedSubReqs / allSubReqs * 100}%</Typography>
                                        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                                            <LinearProgress
                                                color="secondary"
                                                variant="determinate"
                                                value={qualifiedSubReqs / allSubReqs * 100}
                                                sx={{ width: "100%", height: 10, borderRadius: theme.shape.borderRadius }}
                                            />
                                        </Box>
                                    </Box>
                                    <MarkdownLaTeXRenderer content={assessment.feedbackText} />
                                </Box>
                            )
                        })
                    }
                </Grid>
            </Grid>
        </NavLayout>
    );
}