import {Box, IconButton, Tooltip, Typography, useTheme} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {generateLearningResource} from "../services/learningService";
import {getSegmentsByLesson} from "../services/studyProgramLearningService";
import {saveActiveLessonId} from "../features/storage/activeLessonCache";
import {navigationPath} from "../features/navigation/navigationPath.js";
import NavLayout from "./layout/NavLayout";
import Surface from "../components/global/Surface";
import RoundedButton from "../components/global/RoundedButton";
import LoadingView from "./common/LoadingView";
import ErrorView from "./common/ErrorView";
import SegmentTree from "../components/tree/SegmentTree";
import InfoCircleIcon from "../components/customIcons/InfoCircleIcon";

class SegmentSearch {
    /**
     * @param {Array} segments segment array
     * @returns {Object} first segment
     */
    static findFirstSegment(segments: Array<any>): any {
        return segments.find((o: any) => o.segment.previousElement === null) ?? null;
    }

    /**
     */
    static findPreviousSegment(allSegments: any[], selectedSegment: any) {
        if (selectedSegment.segment.previousElement === null)
            return null;
        return allSegments.find(o => o.segment.id === selectedSegment.segment.previousElement.id);
    }

    /**
     */
    static findNextSegments(allSegments: any[], selectedSegment: any) {
        return selectedSegment.segment.nextElements.map((o: any) => allSegments.find(x => x.segment.id === o.id));
    }
}

export default function SegmentTreeView() {
    const theme = useTheme();
    const navigate = useNavigate();
    const {lessonId} = useParams();
    const [segmentsLoading, setSegmentsLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const allSegments = useRef<Array<any>>([]);
    const [selectedSegment, setSelectedSegment] = useState<any>(null);
    const [learningResourceLoading, setLearningResourceLoading] = useState<boolean>(false);

    // exercise creation effect
    useEffect(() => {
        if (!learningResourceLoading)
            return;
        generateLearningResource(selectedSegment.segment.learningResourceDefinitionId)
            .then((learningResourceResponse => {
                if (learningResourceResponse.success === false) {
                    setError(learningResourceResponse.error);
                    setLearningResourceLoading(false);
                    return;
                }
                console.log(learningResourceResponse);
                navigate(navigationPath.fillPath(navigationPath.exercise, learningResourceResponse.data.id), {state: learningResourceResponse.data});
            }));
    }, [learningResourceLoading]);

    async function initialLoad() {
        saveActiveLessonId(lessonId as string);
        const segmentsResponse = await getSegmentsByLesson(lessonId as string);
        if (!segmentsResponse.success) {
            setError(segmentsResponse.error);
            return;
        }
        allSegments.current = segmentsResponse.data;
        let firstSegment = SegmentSearch.findFirstSegment(segmentsResponse.data);
        setSelectedSegment(firstSegment);
        setSegmentsLoading(false);
    }

    // Load initial data
    useEffect(() => {
        initialLoad();
    }, []);

    if (error) {
        return <ErrorView error={error}/>
    }
    if (learningResourceLoading)
        return <LoadingView caption={"Przygotowujemy dla Ciebie materiały. Zazwyczaj zajmuje to około 15 sekund."}/>
    if (segmentsLoading || selectedSegment == null) {
        return <LoadingView/>
    }


    console.log(selectedSegment);
    let previousSegment = SegmentSearch.findPreviousSegment(allSegments.current, selectedSegment);
    console.log(previousSegment);
    let nextSegments = SegmentSearch.findNextSegments(allSegments.current, selectedSegment);
    console.log(nextSegments);

    return (
        <NavLayout>
            <Box sx={{flexGrow: 1, display: "flex", felxDirection: "column", justifyContent: "center"}}>
                <SegmentTree previousElement={previousSegment} mainElement={selectedSegment} nextElements={nextSegments}
                             setMainElement={setSelectedSegment}/>
            </Box>
            <Box sx={{display: "flex", px: theme.spacing(2), py: theme.spacing(4)}}>
                <SelectedElementDescriptionTab selectedElement={selectedSegment}
                                               setExerciseLoading={setLearningResourceLoading}/>
            </Box>
        </NavLayout>
    );
}


function SelectedElementDescriptionTab({selectedElement, setExerciseLoading}: {
    selectedElement: any;
    setExerciseLoading: any;
}) {
    const theme = useTheme();
    return (
        <Surface sx={{flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
            <Box>
                <Typography fontFamily="Baloo" variant="h4">
                    {selectedElement.segment.name}
                </Typography>
                <Typography>{selectedElement.segment.snippetDescription}</Typography>
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: theme.spacing(2),
                flexWrap: "wrap"
            }}>
                <Box sx={{display: "flex", gap: theme.spacing(4)}}>
                    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Typography
                            fontFamily="Baloo"
                            sx={{textAlign: "center"}}
                            variant="h4"
                        >
                            {selectedElement.approachesTaken >= 0 ? selectedElement.approachesTaken : "?"}
                        </Typography>
                        <Typography sx={{textAlign: "center"}}>
                            LICZBA PODEJŚĆ
                        </Typography>
                    </Box>
                    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", position: "relative"}}>
                        <Typography
                            fontFamily="Baloo"
                            sx={{textAlign: "center"}}
                            variant="h4"
                        >
                            {selectedElement.approachesSucceeded >= 0 ? selectedElement.approachesSucceeded : "?"}
                            <Tooltip
                                title="Zadania zaliczone wzorowo to takie dla których każda z osiągniętych ocen jest równa lub wyższa od 5"
                                // sx={{position: "absolute", margin: "auto", transform: "translateY(30%) translateX(30%)"}}
                            >
                                <IconButton>
                                    <InfoCircleIcon color={theme.palette.secondary.main} height="1.5rem"
                                                    width="1.5rem"/>
                                </IconButton>
                            </Tooltip>
                        </Typography>
                        <Typography sx={{textAlign: "center"}}>
                            ZALICZONE WZOROWO
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{marginTop: theme.spacing(2), display: "flex", gap: theme.spacing(4), alignItems: "center", flexWrap: "wrap"}}>
                    <RoundedButton label={"Przejdź do nauki"} active onClick={() => setExerciseLoading(true)}/>
                </Box>
            </Box>
        </Surface>
    );

}

