import { Typography, Grid, useMediaQuery, useTheme } from "@mui/material";
import NavBar from "../../components/Global/NavBar";


export default function NavLayout({ children }){
    const isHeightSmall = useMediaQuery("(min-height: 550px)");
    const isWidthSmall = useMediaQuery("(min-width: 600px)");
    const theme = useTheme();

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
            <Grid container direction='row' gap={theme.spacing(1)} padding={0}>
                <Grid item xs={2} sm={4} md={2}> 
                    { responsiveNav() }
                </Grid>
                <Grid item xs={10} sm={8} md={10}> 
                    { children } 
                </Grid>
            </Grid>
    )
}