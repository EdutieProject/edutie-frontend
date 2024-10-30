import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Box, Typography, useTheme} from '@mui/material';
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
import TextArea from '../components/global/TextArea';
import MermaidRenderer from '../components/mermaid/MermaidRenderer';
import Heading from "../components/global/Heading";
import QuestionMarkIcon from "../components/customIcons/QuestionMarkIcon";
import LightBulbDoodleIcon from "../components/customIcons/LightBulbIcon";

enum SubView {
    THEORY = "THEORY",
    ACTIVITY = "ACTIVITY"
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

    /* solution states workaround */
    const [hintsRevealed, setHintsRevealed] = useState<Array<any>>([]);
    const [solutionText, setSolutionText] = useState<string>("");
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
            generateLearningResultFromSolution(learningResource.id, solutionText, hintsRevealed.length)
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

    if (learningResource === null || assessmentLoading)
        return <LoadingView/>;

    return (
        <NavLayout mode={"flex"} scroll>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Box>
                    <Typography fontFamily={"Baloo"} variant='h3'>Naucz się</Typography>
                    <Typography variant="body1">{learningResource.learningRequirementNames.join(" • ")}</Typography>
                </Box>
                <Box sx={{display: "flex", gap: theme.spacing(4), alignItems: "center"}}>
                    <RoundedButton label={"Teoria"} active={currentView === SubView.THEORY}
                                   onClick={() => setCurrentView(SubView.THEORY)}/>
                    <RoundedButton label={"Praktyka"} active={currentView === SubView.ACTIVITY}
                                   onClick={() => setCurrentView(SubView.ACTIVITY)}/>
                </Box>
            </Box>
            {
                currentView === SubView.ACTIVITY ?
                    <ActivityBlock
                        activity={learningResource.activity}
                        setAssessmentLoading={setAssessmentLoading}
                        hintsRevealed={hintsRevealed}
                        setHintsRevealed={setHintsRevealed}
                        solutionText={solutionText}
                        setSolutionText={setSolutionText}
                    />
                    :
                    <TheoryBlock theory={learningResource.theory}/>
            }
        </NavLayout>
    );
}


function TheoryLayout({children}: { children: React.ReactNode }) {
    const theme = useTheme();
    return (
        <Box sx={{
            flexGrow: 1,
            marginY: theme.spacing(4),
            display: "grid",
            gap: theme.spacing(4),
            gridTemplateColumns: 'repeat(8, 1fr)',
            gridTemplateRows: 'repeat(3, 1fr)',
            gridTemplateAreas: `
      "left left left left left right right right"
      "left left left left left right right right"
      "left left left left left right right right"
      `
        }}> {children} </Box>
    )
}

function TheoryBlock({theory}: { theory: any }) {
    const theme = useTheme();
    return (
        <TheoryLayout>
            <Surface sx={{gridArea: "left"}}>
                <Typography fontFamily={"Baloo"} variant='h5' marginY={theme.spacing(2)}>Materiały do nauki</Typography>
                <Typography variant='body1'>
                    <MarkdownLaTeXRenderer content={theory.overview}/>
                </Typography>
            </Surface>
            <Surface sx={{gridArea: "right"}}>
                <Typography fontFamily={"Baloo"} variant='h5' marginY={theme.spacing(2)}>Naucz się na
                    przykładzie</Typography>
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <MermaidRenderer chart={theory.mermaidGraph}/>
                </Box>
            </Surface>
        </TheoryLayout>
    )
}

interface ActivityBlockProps {
    activity: any;
    setAssessmentLoading: Dispatch<SetStateAction<boolean>>;
    solutionText: string;
    setSolutionText: Dispatch<SetStateAction<string>>;
    hintsRevealed: Array<any>;
    setHintsRevealed: Dispatch<SetStateAction<any>>;
}


function ActivityBlock({
                           activity,
                           setAssessmentLoading,
                           solutionText,
                           setSolutionText,
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
                    <Surface >
                        <Heading variant='h5' marginY={theme.spacing(2)}>Zadanie dla Ciebie</Heading>
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
                        <TextArea
                            minRows={10} maxRows={18}
                            sx={{marginY: theme.spacing(4)}}
                            label='Twoje rozwiązanie'
                            value={solutionText}
                            onChange={(e) => {
                                setSolutionText(e.target.value);
                            }}
                        />
                        <Box sx={{display: "flex", flexDirection: "row-reverse"}}>
                            <RoundedButton label={"Zakończ zadanie"} active/>
                        </Box>
                    </Surface>
                    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: theme.spacing(4)}}>
                        <LightBulbDoodleIcon width={"3rem"} height={"3rem"}/>
                        <Typography>Możesz skorzystać z podpowiedzi!</Typography>
                        <Box sx={{display: "flex", gap: theme.spacing(6), alignItems: "flex-start"}}>
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
                backgroundColor: theme.palette.primary.light,
                width: "12rem",
                flex: "0 0 auto",
                aspectRatio: "5/3",
                textWrap: "wrap",
                display: "grid",
                placeItems: "center",
                transition: "200ms ease",
                "&:hover": {
                    boxShadow: theme.shadows[2],
                    transform: "translateY(-10px)"
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
                <QuestionMarkIcon width={"4em"} height={"4em"} color={theme.palette.common.white}/>
            </Surface>
        );

    return (
        <Surface sx={{
            // backgroundColor: theme.palette.common.white,
            maxWidth: "12rem",
            flex: "0 0 auto",
            aspectRatio: "5/3",
            textWrap: "wrap"
        }}>
            <MarkdownLaTeXRenderer content={hint.text}/>
        </Surface>
    );
}
