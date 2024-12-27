import {useLocation, useNavigate, useParams} from "react-router-dom";
import NavLayout from "./layout/NavLayout.js";
import {Box, Grid, Typography, useTheme} from "@mui/material";
import React, {useEffect, useState} from "react";
import {
    generateLearningResource,
    generateSimilarLearningResource,
    getLearningResultById
} from "../services/learningService";
import ErrorView from "./common/ErrorView.js";
import JoyColorfulFaceIcon from "../components/customIcons/JoyColorfulFaceIcon.js";
import SadColorfulFaceIcon from "../components/customIcons/SadColorfulFaceIcon.js";
import NormalColorfulFaceIcon from "../components/customIcons/NormalColorfulFaceIcon.js";
import LoadingView from "./common/LoadingView.js";
import MarkdownLaTeXRenderer from "../components/markdown/MarkdownLaTexRenderer.js";
import RoundedButton from "../components/global/RoundedButton.js";
import {navigationPath} from "../features/navigation/navigationPath";
import {getActiveLessonId} from "../features/storage/activeLessonCache.js";
import Heading from "../components/global/Heading";
import CancelDoodleIcon from "../components/customIcons/CancelDoodleIcon";
import CheckDoodleIcon from "../components/customIcons/CheckDoodleIcon";
import {clearRandomFactStorage} from "../features/storage/RandomFactStorage";
import {isDateWithinLast3Minutes} from "../features/datetime/datetimeUtilities";
import CustomLinearProgress from "../components/progress/LinearProgress";


export default function LearningResultView() {
    const theme = useTheme();
    const navigate = useNavigate();
    const {resultId} = useParams();
    const {state} = useLocation();
    const [learningResult, setLearningResult] = useState(state);
    const [error, setError] = useState(null);

    const [exerciseLoading, setExerciseLoading] = useState(false);

    console.log(learningResult);

    useEffect(() => {
        if (learningResult != null) {
            console.log("Learning result supplied. No fetching invoked");
            if (learningResult.learningResourceDefinitionType === "DYNAMIC" && isDateWithinLast3Minutes(new Date(learningResult.createdOn))) {
                console.log("Resetting random fact storage - dynamic definition resource accomplished");
                clearRandomFactStorage(); // clear random fact storage for dynamic definition. This may be changed in the future with dynamic definitions variations expansion.
            }
            return;
        }
        getLearningResultById(resultId as string)
            .then(learningResultResponse => {
                console.log(learningResultResponse);
                setLearningResult(learningResultResponse.data);
                setError(learningResultResponse.error);
            });
    }, []);

    // exercise creation effect
    useEffect(() => {
        if (!exerciseLoading)
            return;
        generateSimilarLearningResource(learningResult.associatedLearningResourceId)
            .then((learningResourceResponse => {
                if (learningResourceResponse.success === false) {
                    setError(learningResourceResponse.error);
                    setExerciseLoading(false);
                    return;
                }
                console.log(learningResourceResponse);
                navigate(navigationPath.fillPath(navigationPath.exercise, learningResourceResponse.data.id), {state: learningResourceResponse.data});
            }));
    }, [exerciseLoading]);

    const getHeading = (averageGrade: number) => averageGrade > 4 ?
        "Świetnie!" : averageGrade > 2 ? "W porządku." : "Słabo...";


    const iconSize = "24rem";
    const getIcon = (averageGrade: number) => averageGrade > 4 ?
        <JoyColorfulFaceIcon width={iconSize} height={iconSize}/>
        : averageGrade > 2 ? <NormalColorfulFaceIcon width={iconSize} height={iconSize}/>
            : <SadColorfulFaceIcon width={iconSize} height={iconSize}/>;

    if (error)
        return <ErrorView error={error}/>

    if (learningResult == null || exerciseLoading)
        return <LoadingView/>

    return (
        <NavLayout>
            <Grid container flexGrow={1}>
                <Grid item xs={6}>
                    <Box sx={{position: "fixed", display: "grid", placeItems: "center", height: "100vh", width: "40%"}}>
                        <Box sx={{transform: "translateY(-20%)"}}>{getIcon(learningResult.averageGrade)}</Box>
                    </Box>
                </Grid>
                <Grid item xs={6} sx={{padding: theme.spacing(4)}}>
                    <Heading variant="h3" sx={{color: theme.palette.accentSecond.main}}>
                        {getHeading(learningResult.averageGrade)}
                    </Heading>
                    <MarkdownLaTeXRenderer content={learningResult.feedback.text}/>
                    {
                        learningResult.assessments.map((assessment: any) =>
                            <Box sx={{marginTop: theme.spacing(6)}}>
                                <Typography variant="h5">{assessment.learningRequirementName}</Typography>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: theme.spacing(2),
                                    my: theme.spacing(2)
                                }}>
                                    {
                                        assessment.grade > 4 ?
                                            <CheckDoodleIcon width={"6rem"} height={"6rem"}/>
                                            : <CancelDoodleIcon width={"6rem"} height={"6rem"}/>
                                    }
                                    <Box sx={{flexGrow: 1}}>
                                        <Box sx={{display: "flex", gap: theme.spacing(2)}}>
                                            <Heading variant="h4">Ocena: {assessment.grade}</Heading>
                                            <Box sx={{display: "flex", alignItems: "center", flexGrow: 1}}>
                                                <CustomLinearProgress
                                                    color="accentFirst"
                                                    variant="determinate"
                                                    value={assessment.grade / 6 * 100}
                                                    sx={{
                                                        width: "100%",
                                                        height: 10,
                                                        borderRadius: theme.shape.borderRadius
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                        <Box sx={{display: "flex", gap: theme.spacing(2)}}>
                                            <Heading
                                                variant="h4">Trudność: {(Math.round(assessment.difficultyFactor * 100))}%</Heading>
                                            <Box sx={{display: "flex", alignItems: "center", flexGrow: 1}}>
                                                <CustomLinearProgress
                                                    color="accentSecond"
                                                    variant="determinate"
                                                    value={assessment.difficultyFactor * 100}
                                                    sx={{
                                                        width: "100%",
                                                        height: 10,
                                                        borderRadius: theme.shape.borderRadius
                                                    }}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <MarkdownLaTeXRenderer content={assessment.feedback.text}/>
                            </Box>
                        )
                    }
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: theme.spacing(4),
                        marginY: theme.spacing(6)
                    }}>
                        {
                            learningResult.learningResourceDefinitionType === "STATIC" ? (
                                <>
                                    <RoundedButton label="Wróć do drzewka"
                                                   onClick={() => navigate(navigationPath.fillPath(navigationPath.segmentTree, getActiveLessonId()))}/>
                                    <RoundedButton label="Spróbuj jeszcze raz" active
                                                   onClick={() => setExerciseLoading(true)}/>
                                </>
                            ) : (
                                <>
                                    <RoundedButton label="Wróć do ekranu głównego"
                                                   onClick={() => navigate(navigationPath.home)} active/>
                                </>
                            )
                        }
                    </Box>
                </Grid>
            </Grid>
        </NavLayout>
    );
}