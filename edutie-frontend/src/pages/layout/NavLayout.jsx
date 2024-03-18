import { Typography, Grid, useMediaQuery, useTheme, Container, Box } from "@mui/material";
import NavBar from "../../components/Global/NavBar";


export default function NavLayout({ children }){
    const isHeightSmall = useMediaQuery("(min-height: 550px)");
    const isWidthSmall = useMediaQuery("(min-width: 600px)");
    const theme = useTheme();

    const styles = {
        screenBox: {
            display: "flex", 
            flexDirection: "row", 
            justifyItems: "stretch",
            gap: theme.spacing(2) //TODO: rethink whether gap is needed here
        },
        contentBox: {
            flexGrow: 1, 
            padding: theme.spacing(2)
        }
    };

    const responsiveNav = () => {
        if(isHeightSmall && !isWidthSmall){
            return <Typography>Mała szerokość</Typography>
        }
        else if(isWidthSmall && !isHeightSmall){
            return <Typography>Mała wysokość</Typography>
        }

        return <NavBar/>
    };

    return(
                            // merge those into style class and then into sx={styles.screenBox}
            // <Grid container direction='row' gap={theme.spacing(1)} padding={0}>
            //     <Grid item xs={1}> 
            //         { responsiveNav() }
            //     </Grid>
            //     <Grid item xs={10} sm={8} md={10}> 
            //         { children } 
            //     </Grid>
            // </Grid>
            <Container maxWidth={false} disableGutters sx={{...styles.screenBox, }}>
                <NavBar/>
                <Box sx={styles.contentBox}>
                    { children }
                </Box>
            </Container>
    );
}