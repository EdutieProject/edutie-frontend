import * as React from 'react';

// import Slider from "./Slider";
import grawitacja from "../assets/svg/pictures/grawitacja.svg";
import ladunki from "../assets/svg/pictures/ladunki.svg";
import TextField from '@mui/material/TextField';

import NavLayout from './layout/NavLayout';
import { Box, Typography, useTheme } from '@mui/material';
import Slider from '../components/slider/Slider';


export default function LearnPage() {
    const theme = useTheme();
    const sciences = [
        {
            name: "Fizyka",
            picture: grawitacja
        },
        {
            name: "Matematyka",
            picture: ladunki
        }
    ];

    return (
        <NavLayout>
            <Box sx={{padding: theme.spacing(2), display: "flex", justifyContent: "center"}}>
                <TextField label="Wyszukaj kursik"/>
            </Box>
            <Slider sciences={sciences}/>
        </NavLayout>
    );
}

