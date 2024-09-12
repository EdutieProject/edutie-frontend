import { useLocation, useParams } from "react-router-dom";
import NavLayout from "./layout/NavLayout";
import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { getLearningResultById } from "../services/LearningService";
import ErrorView from "./common/ErrorView";
import JoyColorfulFaceIcon from "../components/customIcons/JoyColorfulFaceIcon";
import SadColorfulFaceIcon from "../components/customIcons/SadColorfulFaceIcon";
import NormalColorfulFaceIcon from "../components/customIcons/NormalColorfulFaceIcon";
import LoadingView from "./common/LoadingView";
import Markdown from "react-markdown";


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

    // if (learningResult == null)
    //     return <LoadingView />

    return (
        <NavLayout mode="flex">
            <Box sx={{ flexGrow: 1, display: "grid", placeItems: "center" }}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: theme.spacing(12) }}>
                    {getIcon(learningResult.feedback.type)}
                    <Box maxWidth={"36rem"}>
                        <Typography variant="h3" color="grey">
                            {getHeading(learningResult.feedback.type)}
                        </Typography>
                        <Markdown children={learningResult.feedback.text}/>
                    </Box>
                </Box>
            </Box>
        </NavLayout>
    );
}