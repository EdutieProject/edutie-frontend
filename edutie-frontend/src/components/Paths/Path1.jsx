import { Typography, Box, Grid } from "@mui/material";
import { gsap } from "gsap";
import { useRef, useLayoutEffect } from 'react';

function PathCircle(){
    const circle = useRef();

    return(
        <Box sx={{display: 'flex',justifyContent: 'center',borderRadius: 50, border:'20px solid #D9D9D9',boxShadow: '0.3em 0.5em 1em rgba(0, 0, 0, 0.3)'}}>
        </Box>
    )
}

function Path(){
    return(
        <>
        <Grid  container spacing={4} flexDirection="column">
            <Grid item container spacing={3}>

                <Grid item>
                    {/* <PathCircle/> */}
                </Grid>        
                

                <Grid item>
                    {/* <PathCircle/>*/}
                </Grid>

                <Grid item>
                    <PathCircle />
                </Grid>

            </Grid>
            <Grid item container spacing={3}>

                <Grid item>
                    {/* <PathCircle/> */}
                </Grid>        
                

                <Grid item>
                    <PathCircle />                
                </Grid>

                <Grid item>
                    {/* <PathCircle/> */}
                </Grid>

            </Grid>
            <Grid item container spacing={3}>
                
                <Grid item>
                    <PathCircle />
                </Grid>        
                

                <Grid item>
                    {/* <PathCircle/>*/}
                </Grid>

                <Grid item>
                    {/* <PathCircle/> */}
                </Grid>

            </Grid>
            <Grid item container spacing={3}>
                
                <Grid item>
                    {/* <PathCircle/> */}
                </Grid>        
                

                <Grid item>
                    <PathCircle/>                
                </Grid>

                <Grid item>
                    {/* <PathCircle/> */}
                </Grid>

            </Grid>
        </Grid>
        
        
        </>
    )
}

export default Path;