import React, { useState } from 'react';
import { Box, Grid, TextField, Typography, useTheme, Backdrop, Link, Button, IconButton, SvgIcon } from '@mui/material';
import NavLayout from './layout/NavLayout';
import RoundedButton from '../components/global/RoundedButton';
import { useParams } from 'react-router-dom';
import Surface from '../components/global/Surface';
import useEnumValue from '../hooks/alternative/useEnumValue';
import CircleButton from '../components/global/CircleButton';
import TurnAroundIcon from '../components/customIcons/TurnAroundIcon';

import CloseIcon from '@mui/icons-material/Close';

import HintTileList from '../features/Flashcards/HintTileList';



export default function ExcerciseView() {
  const theme = useTheme();
  const { segmentId, resourceId } = useParams();
  const Views = Object.freeze({ THEORY: useEnumValue("THEORY"), ACTIVITY: useEnumValue("ACTIVITY") })
  const [currentView, setCurrentView] = useState(Views.THEORY);


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
        currentView == Views.THEORY ?
          <TheoryBlock></TheoryBlock> :
          currentView == Views.ACTIVITY ?
            <ActivityBlock></ActivityBlock> :
            <>Critical Error! {/** TODO: Error messages */} </>
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

function TheoryBlock() {
  const theme = useTheme();
  return (
    <TheoryLayout>
      <Surface sx={{ gridArea: "left" }}>
        <Typography fontFamily={"Baloo"} variant='h5' marginY={theme.spacing(2)}>Czym są elektrowstrząsy?</Typography>
        <Typography variant='body1'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non nulla consequat, tincidunt libero vel, auctor ex. Proin sem neque, tincidunt sed felis non, aliquam cursus velit. Proin nec luctus erat. Sed ante nunc, consectetur vitae ornare sed, feugiat in sapien. Praesent porta nulla sit amet ante molestie efficitur. Nullam non ipsum lobortis, dignissim leo a, scelerisque leo. Donec semper quis massa gravida luctus. Nunc arcu mauris, ultrices id aliquam ut, tincidunt in enim. Duis a consequat dolor, sit amet fringilla quam.
          <br /><br />
          Sed malesuada purus non accumsan congue. In ac elit sit amet quam lacinia scelerisque nec sed quam. Fusce tempor ac sapien ornare porttitor. Nulla id consequat enim, ut tincidunt dui. Sed tempus, felis nec blandit congue, nibh massa sagittis odio, sit amet varius lacus ligula sit amet dui. Nullam porta, sapien at feugiat fermentum, urna ipsum aliquam neque, a efficitur neque nibh sed sapien. Nullam scelerisque in velit non cursus. Integer sed dictum massa. Nullam nunc nunc, sollicitudin et eleifend consectetur, sagittis non enim. Nullam sit amet sapien enim.
          <br /><br />
          Duis fringilla fermentum ipsum eu tincidunt. Phasellus et semper orci. Vivamus quis dui commodo, aliquam ligula ac, malesuada ante. Etiam interdum dolor non tempor dignissim. Phasellus fringilla eleifend magna a facilisis. Integer ipsum purus, consectetur ac tellus vel, euismod vestibulum libero.
        </Typography>
      </Surface>
      <Surface sx={{ gridArea: "right" }}>
        <Typography fontFamily={"Baloo"} variant='h5' marginY={theme.spacing(2)}>Summary</Typography>
        <ul>
          <li>Hello</li>
          <li>World</li>
          <li>Galaxy</li>
          <li>Universe</li>
        </ul>
      </Surface>
      <Surface sx={{ gridArea: "bottom" }}>
        <Grid container spacing={theme.spacing(2)}>
          <Grid item xs={4}>
            <Typography fontFamily={"Baloo"} variant='h4' marginY={theme.spacing(2)}>Twój zeszyt</Typography>
          </Grid>
          <Grid item xs={4}>
            Hello
          </Grid>
          <Grid item xs={4}>
            Wrld
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

function ActivityBlock() {
  const theme = useTheme();
  return (
    <ActivityLayout>
      <Surface sx={{ gridArea: "left" }}>
        <Typography fontFamily={"Baloo"} variant='h5' marginY={theme.spacing(2)}>Zadanie dla Ciebie</Typography>
        <Typography variant='body1'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non nulla consequat, tincidunt libero vel, auctor ex. Proin sem neque, tincidunt sed felis non, aliquam cursus velit. Proin nec luctus erat. Sed ante nunc, consectetur vitae ornare sed, feugiat in sapien. Praesent porta nulla sit amet ante molestie efficitur. Nullam non ipsum lobortis, dignissim leo a, scelerisque leo. Donec semper quis massa gravida luctus. Nunc arcu mauris, ultrices id aliquam ut, tincidunt in enim. Duis a consequat dolor, sit amet fringilla quam.
        </Typography>
      </Surface>
      <Surface sx={{ gridArea: "right" }}>
        <Typography fontFamily={"Baloo"} variant='h5' marginY={theme.spacing(2)}>Twoje rozwiązanie</Typography>
        <Typography variant='body1'>Opisz swoje rozwiązanie. Posłuż się przygotowanym do tego szablonem</Typography>
        <TextField multiline fullWidth sx={{ backgroundColor: theme.palette.common.white, outline: "none", border: "none", borderRadius: 10, marginY: theme.spacing(4), paddingY: theme.spacing(2), "& fieldset": { border: 'none' }, }} minRows={8} maxRows={16} />
      </Surface>
      <Surface sx={{ gridArea: "bottom", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        <Typography fontFamily={"Baloo"} variant='h4' marginY={theme.spacing(2)}>Użyj podpowiedzi</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: theme.spacing(2) }}>
            <HintTile hintText={"World"}/>
            <HintTile hintText={"Hello"}/>
            <HintTile hintText={"Universe"}/>
          </Box>
      </Surface>
      <Box sx={{ gridArea: "button", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircleButton size={theme.spacing(7)} onClick={() => console.log("Button click!")}>
          <Typography fontFamily={"Baloo"} fontSize={64} color={theme.palette.common.white}>{">"}</Typography>
        </CircleButton>
      </Box>
    </ActivityLayout>
  )
}


function HintTile({ hintText }) {
  const theme = useTheme();
  const [revealed, setRevealed] = useState(false);

  if (revealed === false)
    return (
      <Surface sx={{
        backgroundColor: theme.palette.secondary.main, 
        flex: "0 0 auto", 
        aspectRatio: "5/3",
        display: "grid",
        placeItems: "center"
        }}
        onClick={()=>setRevealed(true)}
        >
        <TurnAroundIcon/>
      </Surface>
    );

  return (
    <Surface sx={{backgroundColor: theme.palette.common.white, flex: "0 0 auto", aspectRatio: "5/3"}}>
      <Typography variant='body1'>{hintText}</Typography>
    </Surface>
  );
}
