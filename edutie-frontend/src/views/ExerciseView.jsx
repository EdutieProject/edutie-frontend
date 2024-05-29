import React from 'react';
import { Box, Card, CardContent, Typography, CardHeader, Container, Grid, useTheme } from '@mui/material';
import NavLayout from './layout/NavLayout';
import RoundedButton from '../components/Global/RoundedButton';
import { useParams } from 'react-router-dom';
import Surface from '../components/global/Surface';

function ExerciseTile({ sx, children }) {
  return (
    <Surface sx={sx}>
      { children }
    </Surface>
  );
}

export default function ExcerciseView() {
  const theme = useTheme();
  const { segmentId, resourceId } = useParams();


  return (
    <NavLayout mode={"flex"}>
      <Box sx={{display: "flex", justifyContent: "space-between"}}>
        <Box>
          <Typography fontFamily={"Baloo"} variant='h3'>Elektrowstrząsy</Typography>
          <Typography variant="body1">Elektrostatyka - Różnica potencjałów</Typography>
        </Box>
        <Box sx={{display: "flex", gap: theme.spacing(4), alignItems: "center"}}>
            <RoundedButton label={"Teoria"} active/>
            <RoundedButton label={"Praktyka"}/>
        </Box>
      </Box>
      <Grid container marginY={theme.spacing(4)} spacing={4} sx={{flexGrow: 1}}>
        <Grid item md={8}>
          <ExerciseTile sx={{height: "100%"}}>
            <Typography fontFamily={"Baloo"} variant='h5' marginY={theme.spacing(2)}>Czym są elektrowstrząsy?</Typography>
            <Typography variant='body1'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non nulla consequat, tincidunt libero vel, auctor ex. Proin sem neque, tincidunt sed felis non, aliquam cursus velit. Proin nec luctus erat. Sed ante nunc, consectetur vitae ornare sed, feugiat in sapien. Praesent porta nulla sit amet ante molestie efficitur. Nullam non ipsum lobortis, dignissim leo a, scelerisque leo. Donec semper quis massa gravida luctus. Nunc arcu mauris, ultrices id aliquam ut, tincidunt in enim. Duis a consequat dolor, sit amet fringilla quam.
            <br/><br/>
            Sed malesuada purus non accumsan congue. In ac elit sit amet quam lacinia scelerisque nec sed quam. Fusce tempor ac sapien ornare porttitor. Nulla id consequat enim, ut tincidunt dui. Sed tempus, felis nec blandit congue, nibh massa sagittis odio, sit amet varius lacus ligula sit amet dui. Nullam porta, sapien at feugiat fermentum, urna ipsum aliquam neque, a efficitur neque nibh sed sapien. Nullam scelerisque in velit non cursus. Integer sed dictum massa. Nullam nunc nunc, sollicitudin et eleifend consectetur, sagittis non enim. Nullam sit amet sapien enim. 
            <br/><br/>
            Duis fringilla fermentum ipsum eu tincidunt. Phasellus et semper orci. Vivamus quis dui commodo, aliquam ligula ac, malesuada ante. Etiam interdum dolor non tempor dignissim. Phasellus fringilla eleifend magna a facilisis. Integer ipsum purus, consectetur ac tellus vel, euismod vestibulum libero.
            </Typography>
          </ExerciseTile>
        </Grid>
        <Grid item md={4}>
          <ExerciseTile sx={{height: "100%"}}>
            World!
          </ExerciseTile>
        </Grid>
      </Grid>
      <ExerciseTile sx={{flexGrow: 1}}>
        Universe
      </ExerciseTile>
  </NavLayout>
  );
}