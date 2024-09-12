import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, TextField, Typography, useTheme } from '@mui/material';
import NavLayout from './layout/NavLayout';
import RoundedButton from '../components/global/RoundedButton';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Surface from '../components/global/Surface';
import useEnumValue from '../hooks/alternative/useEnumValue';
import CircleButton from '../components/global/CircleButton';
import TurnAroundIcon from '../components/customIcons/TurnAroundIcon';
import { assessSolution, getLearningResourceById } from '../services/LearningService';
import LoadingView from './common/LoadingView';
import ErrorView from './common/ErrorView';
import { navigationPath } from '../features/navigation';
import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex"
import MarkdownLaTeXRenderer from '../components/markdown/MarkdownLaTexRenderer';


const preprocessMarkdown = (markdownText) => {
  // Replace \[ with $$ and \] with $$ to ensure compatibility
  const processedText = markdownText
    .replace(/\\\[/g, '$$$')  // Replace all occurrences of \[ with $$
    .replace(/\\\]/g, '$$$'); // Replace all occurrences of \] with $$

  return processedText;
};

const remarkMathOptions = {
  singleDollarTextMath: false,
}


export default function LearningResourceView() {
  const theme = useTheme();
  /* Learning resource parameters */
  const { resourceId } = useParams();
  const { state } = useLocation();
  const [learningResource, setLearningResource] = useState(state);
  /* Views display parameters */
  const [error, setError] = useState(null);
  const Views = Object.freeze({ THEORY: useEnumValue("THEORY"), ACTIVITY: useEnumValue("ACTIVITY") })
  const [currentView, setCurrentView] = useState(Views.THEORY);
  const [assessmentLoading, setAssessmentLoading] = useState(false);

  useEffect(() => {
    if (learningResource != null) {
      console.log("Learning resource supplied. No fetching invoked");
      return;
    }
    getLearningResourceById(resourceId)
      .then(learningResourceResponse => {
        console.log(learningResourceResponse);
        setLearningResource(learningResourceResponse.data);
        setError(learningResourceResponse.error);
      });
  }, []);

  console.log(learningResource);

  if (error)
    return <ErrorView error={error} />

  if (learningResource === null || assessmentLoading)
    return (<LoadingView><ActivityBlock
      activity={learningResource.activity}
      learningResourceId={learningResource.id}
      setAssessmentLoading={setAssessmentLoading}
      assessmentLoading={assessmentLoading}
      setError={setError} /></LoadingView>);

  return (
    <NavLayout mode={"flex"} scroll>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography fontFamily={"Baloo"} variant='h3'>Elektrowstrząsy</Typography>

          <Typography variant="body1">Elektrostatyka - Różnica potencjałów</Typography>

        </Box>
        <Box sx={{ display: "flex", gap: theme.spacing(4), alignItems: "center" }}>
          <RoundedButton label={"Teoria"} active={currentView == Views.THEORY} onClick={() => setCurrentView(Views.THEORY)} />
          <RoundedButton label={"Praktyka"} active={currentView == Views.ACTIVITY} onClick={() => setCurrentView(Views.ACTIVITY)} />
        </Box>
      </Box>
      {
        currentView == Views.ACTIVITY ?
          <ActivityBlock
            activity={learningResource.activity}
            learningResourceId={learningResource.id}
            setAssessmentLoading={setAssessmentLoading}
            assessmentLoading={assessmentLoading}
            setError={setError} />
          : <TheoryBlock theory={learningResource.theory} />
      }
    </NavLayout>
  );
}


function TheoryLayout({ children }) {
  const theme = useTheme();
  return (
    <Box sx={{
      flexGrow: 1,
      marginY: theme.spacing(4),
      display: "grid",
      gap: theme.spacing(4),
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 'repeat(3, 1fr)',
      gridTemplateAreas: `
      "left left right"
      "left left right"
      "left left right"
      `
    }}> {children} </Box>
  )
}

function TheoryBlock({ theory }) {
  const theme = useTheme();
  return (
    <TheoryLayout>
      <Surface sx={{ gridArea: "left" }}>
        <Typography fontFamily={"Baloo"} variant='h5' marginY={theme.spacing(2)}>Czym są elektrowstrząsy?</Typography>
        <Typography variant='body1'>
          <MarkdownLaTeXRenderer content={theory.overview} />
        </Typography>
      </Surface>
      <Surface sx={{ gridArea: "right" }}>
        <Typography fontFamily={"Baloo"} variant='h5' marginY={theme.spacing(2)}>Summary</Typography>
        <MarkdownLaTeXRenderer content={theory.summary} />
      </Surface>
    </TheoryLayout>
  )
}


function ActivityBlock({ learningResourceId, activity, setAssessmentLoading, assessmentLoading, setError }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const solutionText = useRef("");

  const bumpHintsRevealed = () => setHintsRevealed(hintsRevealed + 1);

  useEffect(() => {
    if (assessmentLoading)
      assessSolution(learningResourceId, solutionText.current, hintsRevealed)
        .then(learningResultResponse => {
          console.log(learningResultResponse);
          if (learningResultResponse.success === false) {
            setError(learningResultResponse.error);
            setAssessmentLoading(false);
            return;
          }
          navigate(navigationPath.fillPath(navigationPath.learningResult, learningResultResponse.data.id), { state: learningResultResponse.data });
        });
  }, [assessmentLoading]);

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
      `}}>
        <Surface sx={{ gridArea: "left", overflowY: "scroll" }}>
          <Typography fontFamily={"Baloo"} variant='h5' marginY={theme.spacing(2)}>Zadanie dla Ciebie</Typography>
          <Typography variant='body1'>
            <MarkdownLaTeXRenderer content={activity.activityText} />
          </Typography>
        </Surface>
        <Surface sx={{ gridArea: "right" }}>
          <Typography fontFamily={"Baloo"} variant='h5' marginY={theme.spacing(2)}>Twoje rozwiązanie</Typography>
          <Typography variant='body1'>Opisz swoje rozwiązanie. Posłuż się przygotowanym do tego szablonem</Typography>
          <TextField
            multiline
            fullWidth
            sx={{ backgroundColor: theme.palette.common.white, outline: "none", border: "none", borderRadius: 10, marginY: theme.spacing(4), paddingY: theme.spacing(2), "& fieldset": { border: 'none' }, }}
            minRows={8} maxRows={16}
            onChange={(e) => { solutionText.current = e.target.value; }}
          />
        </Surface>
      </Box>
      <Box sx={{
        marginY: theme.spacing(4),
        display: "grid",
        gap: theme.spacing(4),
        gridTemplateColumns: 'repeat(6, 1fr)',
        gridTemplateAreas: `
      "bottom bottom bottom bottom bottom button"
      `}}>
        <Surface sx={{ gridArea: "bottom", display: "flex", justifyContent: "space-between", flexWrap: "nowrap" }}>
          <Typography fontFamily={"Baloo"} variant='h4' marginY={theme.spacing(2)}>Użyj podpowiedzi</Typography>
          <Grid container gap={theme.spacing(2)} justifyContent={"flex-end"}>
            {
              activity.hints.map(
                (hint, i) => <HintTile hintText={hint.text} key={i} bumpRevealedHints={bumpHintsRevealed} />
              )
            }
          </Grid>
        </Surface>
        <Box sx={{ gridArea: "button", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircleButton size={theme.spacing(7)} onClick={() => setAssessmentLoading(true)}>
            <Typography fontFamily={"Baloo"} fontSize={64} color={theme.palette.common.white}>{">"}</Typography>
          </CircleButton>
        </Box>
      </Box>
    </Box>

  );
}


function HintTile({ hintText, bumpRevealedHints }) {
  const theme = useTheme();
  const [revealed, setRevealed] = useState(false);

  if (revealed === false)
    return (
      <Grid item xs={3}>
        <Surface sx={{
          backgroundColor: theme.palette.secondary.main,
          flex: "0 0 auto",
          aspectRatio: "5/3",
          display: "grid",
          placeItems: "center"
        }}
          onClick={() => { setRevealed(true); bumpRevealedHints(); }}
        >
          <TurnAroundIcon />
        </Surface>
      </Grid>
    );

  return (
    <Grid item xs={3}>
      <Surface sx={{ backgroundColor: theme.palette.common.white, flex: "0 0 auto", aspectRatio: "5/3", textWrap: "wrap" }}>
        <Typography variant='body1'>{hintText}</Typography>
      </Surface>
    </Grid>
  );
}
