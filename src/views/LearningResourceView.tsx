import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Box, Divider, IconButton, Typography, useTheme} from '@mui/material';
import NavLayout from './layout/NavLayout.js';
import RoundedButton from '../components/global/RoundedButton.js';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import Surface from '../components/global/Surface.js';
import TurnAroundIcon from '../components/customIcons/TurnAroundIcon.js';
import {generateLearningResultFromSolution, getLearningResourceById} from '../services/learningService';
import LoadingView from './common/LoadingView.js';
import ErrorView from './common/ErrorView.js';
import {navigationPath} from '../features/navigation/navigationPath';
import MarkdownLaTeXRenderer from '../components/markdown/MarkdownLaTexRenderer.js';
import Heading from "../components/global/Heading";
import LightBulbDoodleIcon from "../components/customIcons/LightBulbIcon";
import MermaidRenderer from "../components/mermaid/MermaidRenderer";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import Editor, {normalizeEditorOutputData} from "../components/editors/Editor";
import {OutputData} from "@editorjs/editorjs";

enum SubView {
    THEORY = "THEORY",
    ACTIVITY = "ACTIVITY",
    VISUALISATION = "VISUALISATION"
}

const solutionTemplateEditorData: OutputData = {
    "time": new Date().getTime(),
    "blocks": [
        {
            "type": "header",
            "data": {
                "text": "Podejście do problemu",
                "level": 2
            }
        },
        {
            "type": "paragraph",
            "data": {
                "text": "Problemy rozwiążę poprzez zastosowanie [...]. Korzystam z tego, ponieważ [...]"
            }
        },
        {
            "type": "header",
            "data": {
                "text": "Obliczenia",
                "level": 2
            }
        },
        {
            "type": "paragraph",
            "data": {
                "text": "Poniżej zawieram obliczenia (o ile są potrzebne)"
            }
        },
        {
            "type": "math",
            "data": {
                "latex": "1+2^3=3^2",
            }
        },
        {
            "type": "header",
            "data": {
                "text": "Podsumowanie rozwiązania",
                "level": 2
            }
        },
        {
            "type": "paragraph",
            "data": {
                "text": "Zastosowane zostały założenia zagadnienia [...]",
            }
        },
    ]
}

export default function LearningResourceView() {
    const navigate = useNavigate();
    const theme = useTheme();
    /* Learning resource parameters */
    const {resourceId} = useParams<string>();
    const {state} = useLocation();
    const [learningResource, setLearningResource] = useState(state);
    /* Views display parameters */
    const [error, setError] = useState(null);
    const [currentView, setCurrentView] = useState<SubView>(SubView.THEORY);

    /* sub-view states workarounds */
    const [activeTheoryCardIdx, setActiveTheoryCardIdx] = useState<number>(0);
    const [hintsRevealed, setHintsRevealed] = useState<Array<any>>([]);
    const [solutionData, setSolutionData] = useState<OutputData>(solutionTemplateEditorData);
    const [assessmentLoading, setAssessmentLoading] = useState(false);

    useEffect(() => {
        if (learningResource != null) {
            console.log("Learning resource supplied. No fetching invoked");
            return;
        }
        getLearningResourceById(resourceId as string)
            .then(learningResourceResponse => {
                console.log(learningResourceResponse);
                setLearningResource(learningResourceResponse.data);
                setError(learningResourceResponse.error);
            });
    }, []);

    useEffect(() => {
        if (assessmentLoading) {
            generateLearningResultFromSolution(learningResource.id, normalizeEditorOutputData(solutionData), hintsRevealed.length)
                .then(learningResultResponse => {
                    console.log(learningResultResponse);
                    if (learningResultResponse.success === false) {
                        setError(learningResultResponse.error);
                        setAssessmentLoading(false);
                        return;
                    }
                    console.log("navigating");
                    navigate(navigationPath.fillPath(navigationPath.learningResult, learningResultResponse.data.id), {state: learningResultResponse.data});
                });
        }
    }, [assessmentLoading]);

    console.log(learningResource);

    if (error)
        return <ErrorView error={error}/>
    if (assessmentLoading)
        return <LoadingView caption={"Oceniamy twoje rozwiązanie! Zazwyczaj zajmuje to około 15 sekund."}/>
    if (learningResource === null)
        return <LoadingView/>;

    return (
        <NavLayout>
            <Box sx={{display: "flex", justifyContent: "space-between", marginBottom: theme.spacing(4)}}>
                <Box>
                    <Typography fontFamily={"Baloo"} variant='h3'>Naucz się</Typography>
                    <Typography
                        variant="body1">{learningResource.learningRequirements.map((o: any) => o.name).join(" • ")}</Typography>
                </Box>
                <Box sx={{display: "flex", gap: theme.spacing(4), alignItems: "center"}}>
                    <RoundedButton label={"Wizualizacja"} active={currentView === SubView.VISUALISATION}
                                   onClick={() => setCurrentView(SubView.VISUALISATION)}/>
                    <RoundedButton label={"Teoria"} active={currentView === SubView.THEORY}
                                   onClick={() => setCurrentView(SubView.THEORY)}/>
                    <RoundedButton label={"Praktyka"} active={currentView === SubView.ACTIVITY}
                                   onClick={() => setCurrentView(SubView.ACTIVITY)}/>
                </Box>
            </Box>
            <Divider variant={"middle"}/>
            {
                currentView === SubView.ACTIVITY ?
                    <ActivityBlock
                        activity={learningResource.activity}
                        setAssessmentLoading={setAssessmentLoading}
                        hintsRevealed={hintsRevealed}
                        setHintsRevealed={setHintsRevealed}
                        solutionData={solutionData}
                        setSolutionData={setSolutionData}
                    />
                    : currentView === SubView.VISUALISATION ?
                        <VisualisationBlock mermaidVisualisationString={learningResource.visualisation.code}/> :
                        <TheoryBlock theoryCards={learningResource.theoryCards}
                                     learningRequirements={learningResource.learningRequirements}
                                     activeCardIdx={activeTheoryCardIdx}
                                     setActiveCardIdx={setActiveTheoryCardIdx}/>
            }
        </NavLayout>
    );
}

function VisualisationBlock({mermaidVisualisationString}: { mermaidVisualisationString: string }) {
    const theme = useTheme();
    return (
        <Box sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: theme.spacing(4)
        }}>
            <MermaidRenderer chart={mermaidVisualisationString}/>
        </Box>
    );
}

function TheoryBlock({theoryCards, learningRequirements, activeCardIdx, setActiveCardIdx}: {
    theoryCards: Array<any>;
    learningRequirements: Array<any>;
    activeCardIdx: number;
    setActiveCardIdx: Dispatch<SetStateAction<number>>
}) {
    const theme = useTheme();

    let learningRequirement = learningRequirements.find(o => o.learningRequirementId === theoryCards[activeCardIdx].learningRequirementId);
    return (
        <Box sx={{
            flexGrow: 1,
            marginY: theme.spacing(4),
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: theme.spacing(6),
                marginBottom: theme.spacing(2)
            }}>
                <IconButton onClick={() => setActiveCardIdx((x: number) => Math.abs((x - 1) % theoryCards.length))}
                            disabled={theoryCards.length === 1}>
                    <ChevronLeft/>
                </IconButton>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Typography variant="body1" width={"24rem"} textAlign={"center"}>{learningRequirement.name}</Typography>
                </Box>
                <IconButton onClick={() => setActiveCardIdx((x: number) => Math.abs((x + 1) % theoryCards.length))}
                            disabled={theoryCards.length === 1}>
                    <ChevronRight/>
                </IconButton>
            </Box>
            <Surface>
                <MarkdownLaTeXRenderer content={theoryCards[activeCardIdx].overview}/>
            </Surface>
        </Box>
    )
}

interface ActivityBlockProps {
    activity: any;
    setAssessmentLoading: Dispatch<SetStateAction<boolean>>;
    solutionData: OutputData;
    setSolutionData: Dispatch<SetStateAction<OutputData>>;
    hintsRevealed: Array<any>;
    setHintsRevealed: Dispatch<SetStateAction<any>>;
}


function ActivityBlock({
                           activity,
                           setAssessmentLoading,
                           solutionData,
                           setSolutionData,
                           hintsRevealed,
                           setHintsRevealed
                       }: ActivityBlockProps) {
    const theme = useTheme();

    return (
        <Box sx={{
            flexGrow: 1,
            marginY: theme.spacing(4),
        }}>
            <Box sx={{
                display: "grid",
                gap: theme.spacing(4),
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                gridTemplateAreas: `
      "left right right"
      "left right right"
      `
            }}>
                <Box sx={{gridArea: "left"}}>
                    <Surface>
                        <Heading variant='h5' sx={{marginY: theme.spacing(2)}}>Zadanie dla Ciebie</Heading>
                        <Typography variant='body1'>
                            <MarkdownLaTeXRenderer content={activity.activityText}/>
                        </Typography>
                    </Surface>
                </Box>
                <Box sx={{gridArea: "right", display: "flex", flexDirection: "column", gap: theme.spacing(6)}}>
                    <Surface>
                        <Heading variant='h5' sx={{marginY: theme.spacing(2)}}>Twoje rozwiązanie</Heading>
                        <Typography variant='body1'>
                            Opisz swoje rozwiązanie. Zawrzyj w nim swój tok myślenia, pokaż szczegółowo krok po kroku w
                            jaki
                            sposób zadanie było rozwiązywane. Twoje rozwiązanie będzie oceniane na podstawie twojego
                            zrozumienia tematu!
                        </Typography>
                        <Editor currentContent={solutionData} setCurrentContent={setSolutionData}/>
                        <Box sx={{display: "flex", flexDirection: "row-reverse"}}>
                            <RoundedButton label={"Zakończ zadanie"} active onClick={() => setAssessmentLoading(true)}/>
                        </Box>
                    </Surface>
                        <Box sx={{display: "flex", gap: theme.spacing(6), alignItems: "flex-start", flexWrap: "wrap", justifyContent: "center"}}>
                            {
                                activity.hints.map((hint: any) =>
                                    <HintTile hint={hint}
                                              isRevealed={hintsRevealed.filter(o => o.id === hint.id).length > 0}
                                              setHintsRevealed={setHintsRevealed}
                                    />
                                )
                            }
                        </Box>
                </Box>
            </Box>
        </Box>

    );
}


function HintTile({hint, isRevealed, setHintsRevealed}: {
    hint: any,
    isRevealed: boolean,
    setHintsRevealed: Dispatch<SetStateAction<Array<any>>>
}) {
    const theme = useTheme();
    const [revealed, setRevealed] = useState(isRevealed);

    if (!revealed)
        return (
            <Surface sx={{
                backgroundColor: theme.palette.accentFirst.main,
                width: "12rem",
                flex: "0 0 auto",
                aspectRatio: "5/3",
                textWrap: "wrap",
                display: "grid",
                placeItems: "center",
                transition: "200ms ease",
                "&:hover": {
                    backgroundColor: theme.palette.accentFirst.light,
                    boxShadow: theme.shadows[2],
                    transform: "translateY(-5px)"
                }
            }}
                     onClick={() => {
                         setRevealed(true);
                         setHintsRevealed((x) => {
                             x.push(hint);
                             return x;
                         })
                     }}
            >
                <LightBulbDoodleIcon width={"4rem"} height={"4rem"} />
            </Surface>
        );

    return (
        <Surface sx={{
            // backgroundColor: theme.palette.common.white,
            maxWidth: "12rem",
            flex: "0 0 auto",
            aspectRatio: "5/3",
            textWrap: "wrap",
            transform: "translateY(-5px)",
            backgroundColor: theme.palette.accentFirst.light
        }}>
            <MarkdownLaTeXRenderer content={hint.text}/>
        </Surface>
    );
}
