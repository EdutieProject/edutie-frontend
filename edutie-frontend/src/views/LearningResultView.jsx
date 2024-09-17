import { useLocation, useParams } from "react-router-dom";
import NavLayout from "./layout/NavLayout";
import { Box, LinearProgress, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { getLearningResultById } from "../services/LearningService";
import ErrorView from "./common/ErrorView";
import JoyColorfulFaceIcon from "../components/customIcons/JoyColorfulFaceIcon";
import SadColorfulFaceIcon from "../components/customIcons/SadColorfulFaceIcon";
import NormalColorfulFaceIcon from "../components/customIcons/NormalColorfulFaceIcon";
import LoadingView from "./common/LoadingView";
import Markdown from "react-markdown";
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

    const iconSize = "18rem";
    const getIcon = (feedbackType) => feedbackType === "POSITIVE" ? <JoyColorfulFaceIcon width={iconSize} height={iconSize} />
        : feedbackType === "NEGATIVE" ? <SadColorfulFaceIcon width={iconSize} height={iconSize} />
            : <NormalColorfulFaceIcon width={iconSize} height={iconSize} />;

    if (error)
        return <ErrorView error={error} />

    if (learningResult == null)
        return <LoadingView />

    return (
        <NavLayout mode="flex" scroll>
            <Box sx={{ flexGrow: 1, display: "grid", placeItems: "center" }}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: theme.spacing(12) }}>
                    <Box sx={{ display: "grid", placeItems: "center", transform: "translateY(-10%)" }}>
                        {getIcon(learningResult.feedback.type)}
                    </Box>
                    <Box maxWidth={"36rem"}>
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
                    </Box>
                </Box>
            </Box>
        </NavLayout>
    );
}