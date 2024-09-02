import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, TextField, Typography, useTheme } from '@mui/material';
import NavLayout from './layout/NavLayout';
import RoundedButton from '../components/global/RoundedButton';
import { useLocation, useParams } from 'react-router-dom';
import Surface from '../components/global/Surface';
import useEnumValue from '../hooks/alternative/useEnumValue';
import CircleButton from '../components/global/CircleButton';
import TurnAroundIcon from '../components/customIcons/TurnAroundIcon';
import { assessSolution, getLearningResourceById } from '../services/LearningService';
import LoadingView from './common/LoadingView';
import ErrorView from './common/ErrorView';


export default function ExcerciseView() {
  const theme = useTheme();
  /* Learning resource parameters */
  const { resourceId } = useParams();
  const { state } = useLocation();
  const [learningResource, setLearningResource] = useState(state);
  /* Views display parameters */
  const [error, setError] = useState(null);
  const Views = Object.freeze({ THEORY: useEnumValue("THEORY"), ACTIVITY: useEnumValue("ACTIVITY") })
  const [currentView, setCurrentView] = useState(Views.THEORY);

  useEffect(() => {
    if (learningResource !== null) 
      return;
    getLearningResourceById(resourceId)
    .then(learningResourceResponse => {
      setLearningResource(learningResourceResponse.data);
      setError(learningResourceResponse.error);
    })


  }, [])

  if (error)
    return <ErrorView error={error}/>

  if (learningResource === null)
    return <LoadingView/>

  return (
    <NavLayout mode={"flex"}>
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
            <ActivityBlock activity={learningResource.activity} learningResourceId={learningResource.id}/> 
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
      gridTemplateRows: 'repeat(4, 1fr)',
      gridTemplateAreas: `
      "left left right"
      "left left right"
      "left left right"
      "bottom bottom bottom"
      `,
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
          {theory.overview}
        </Typography>
      </Surface>
      <Surface sx={{ gridArea: "right" }}>
        <Typography fontFamily={"Baloo"} variant='h5' marginY={theme.spacing(2)}>Summary</Typography>
        {theory.summary}
      </Surface>
      <Surface sx={{ gridArea: "bottom" }}>
        <Grid container spacing={theme.spacing(2)}>
          <Grid item xs={4}>
            <Typography fontFamily={"Baloo"} variant='h4' marginY={theme.spacing(2)}>Twój zeszyt</Typography>
          </Grid>
          <Grid item xs={4}>
            <i>TBA...</i>
          </Grid>
          <Grid item xs={4}>
            Coming soon
          </Grid>
        </Grid>

      </Surface>
    </TheoryLayout>
  )
}

function ActivityLayout({ children }) {
  const theme = useTheme();
  return (
    <Box sx={{
      flexGrow: 1,
      marginY: theme.spacing(4),
      display: "grid",
      gap: theme.spacing(4),
      gridTemplateColumns: 'repeat(6, 1fr)',
      gridTemplateRows: 'repeat(3, 0.8fr)',
      gridTemplateAreas: `
      "left left right right right right"
      "left left right right right right"
      "bottom bottom bottom bottom bottom button"

      `,
    }}> {children} </Box>
  )
}

function ActivityBlock({ learningResourceId, activity }) {
  const theme = useTheme();
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const solutionText = useRef();

  const bumpHintsRevealed = () => setHintsRevealed(hintsRevealed + 1);

  const submitSolution = (lrId,  solutionText, hintsRevealed) => {
    assessSolution(lrId, solutionText, hintsRevealed).then(
      learningResultResponse => console.log(learningResultResponse)
    );
  };

  return (
    <ActivityLayout>
      <Surface sx={{ gridArea: "left" }}>
        <Typography fontFamily={"Baloo"} variant='h5' marginY={theme.spacing(2)}>Zadanie dla Ciebie</Typography>
        <Typography variant='body1'>
          {activity.activityText}
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
        <CircleButton size={theme.spacing(7)} onClick={() => submitSolution(learningResourceId, solutionText.current, hintsRevealed)}>
          <Typography fontFamily={"Baloo"} fontSize={64} color={theme.palette.common.white}>{">"}</Typography>
        </CircleButton>
      </Box>
    </ActivityLayout>
  )
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
