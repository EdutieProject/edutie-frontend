import React from 'react';
import { Box, Card, CardContent, Typography, CardHeader, Container, Grid } from '@mui/material';
import NavLayout from './layout/NavLayout';
import theme from '../theme/Theme';
import RoundedButton from '../components/Global/RoundedButton';

export default function ExcerciseView() {
  return (
    <NavLayout>
      <Box sx={{display: "flex", justifyContent: "space-between"}}>
        <Typography fontFamily={"Baloo"} variant='h3'>Elektrowstrząsy</Typography>
        <Box sx={{display: "flex", gap: theme.spacing(4)}}>
            <RoundedButton label={"Teoria"} active/>
            <RoundedButton label={"Praktyka"}/>
        </Box>
      </Box>
  </NavLayout>
  );
}