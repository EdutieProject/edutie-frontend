import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import NavLayout from './layout/NavLayout';
import RoundedButton from '../components/Global/RoundedButton';
import { useParams } from 'react-router-dom';
import Surface from '../components/global/Surface';

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

export default function ExcerciseView() {
  const theme = useTheme();
  const { segmentId, resourceId } = useParams();


  return (
    <NavLayout mode={"flex"}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography fontFamily={"Baloo"} variant='h3'>Elektrowstrząsy</Typography>
          <Typography variant="body1">Elektrostatyka - Różnica potencjałów</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: theme.spacing(4), alignItems: "center" }}>
          <RoundedButton label={"Teoria"} active />
          <RoundedButton label={"Praktyka"} />
        </Box>
      </Box>
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
          <Typography fontFamily={"Baloo"} variant='h4' marginY={theme.spacing(2)}>Twój zeszyt</Typography>
        </Surface>
      </TheoryLayout>
    </NavLayout>
  );
}