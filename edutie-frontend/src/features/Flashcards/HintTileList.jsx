import React, { useState } from 'react';
import Surface from '../../components/global/Surface';
import { Box, Grid, Typography, useTheme, Button } from '@mui/material';
import Zoom from '@mui/material/Zoom';

export default function HintTileList({ hintText = "X" }) {
    const theme = useTheme();

    

    return (

        <Box sx={{ justifyContent: "flex-end" }}>
            <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 12, sm: 12, md: 24, lg: 12 }}>
                {Array.from(Array(4)).map(() => (
                    <Grid item sm={12} md={12} lg={3} >
                        <HintTile hintText={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel imperdiet lacus."} />
                    </Grid>
                ))}
            </Grid>
        </Box>

    )
}

function HintTile({ hintText }) {
    const theme = useTheme();
    const [isFlipped, setFlip] = useState(false);

    return (
        <div onClick={() => { setFlip(!isFlipped); }}>
            <Surface sx={{ backgroundColor: theme.palette.common.white, flex: "1 1", aspectRatio: "5/3", cursor: "pointer" }}>
                    <Typography variant='body1'>{isFlipped ? hintText : "Kliknij żeby zobaczyć podpowiedź"}</Typography>
            </Surface>
        </div>

    );
}