import { Card, Typography, Grid, Container, useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import Home from "../components/Home/Home";
import NavBar from "../components/Global/NavBar";
import { useSelector } from "react-redux";



export default function Main({ page }){
    const isHeightSmall = useMediaQuery("(min-height: 550px)")
    const isWidthSmall = useMediaQuery("(min-width: 600px)")

    const responsiveNav = () => {
        if(isHeightSmall && !isWidthSmall){
            return <Typography>Mała szerokość</Typography>
        }
        if(isWidthSmall && !isHeightSmall){
            return <Typography>Mała wysokość</Typography>
        }
            
        if(isHeightSmall && isWidthSmall)
        {
            return <NavBar/>
        }
    }
    return(
            <Grid container direction='row'>
                <Grid item xs={2} sm={4} md={2}> 
                    {
                       responsiveNav() 
                    }
                </Grid>
                <Grid item xs={10} sm={8} md={10}> 
                   {page} 
                </Grid>
            </Grid>
    )
}