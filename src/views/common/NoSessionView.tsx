import {Box, Container, Grid, Theme, Typography, useTheme} from "@mui/material";
import React from "react";
import Heading from "../../components/global/Heading";
import {getLoginUrl} from "src/services/authenticationService";
import {Warning} from "@mui/icons-material";


/**
 * A specific error view for session timeout
 * @constructor
 */
export default function NoSessionView() {
    const theme = useTheme();

    const iconSize = "24rem";

    return (
        <Container sx={{position: "relative"}} disableGutters maxWidth={false}>
            <BlobBackground theme={theme}/>
            <Grid container flexGrow={1} marginTop={theme.spacing(4)}>
                <Grid item xs={6}>
                    <Box sx={{position: "fixed", display: "grid", placeItems: "center", height: "100vh", width: "40%"}}>
                        <Box sx={{transform: "translateY(-20%)"}}>
                            <Warning width={iconSize} height={iconSize}/>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6} sx={{padding: theme.spacing(4)}}>
                    <Heading variant="h2" color="grey">Nie poznaję cię...</Heading>
                    <Typography padding={"1em 0"} variant="body1" color="initial">
                        Powinieneś zostać przekierowany - jeśli to się nie stanie kliknij <a
                        href={getLoginUrl()}> tutaj </a>
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}

const BlobBackground = ({theme}: { theme: Theme }) => (
    <Box sx={{position: "absolute", top: 0, left: 0, height: "100%", width: "100%", zIndex: -1, overflow: "visible"}}>
        <svg id="10015.io" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg"
             style={{position: "absolute", top: "-10vh", left: "-20vw", maxWidth: "840px"}}>
            <path fill={theme.palette.primary.main}
                  d="M389,287.5Q388,335,346,357.5Q304,380,259.5,395.5Q215,411,183.5,376Q152,341,96,320Q40,299,48,242.5Q56,186,83.5,138.5Q111,91,164,85Q217,79,259,92Q301,105,337,130Q373,155,381.5,197.5Q390,240,389,287.5Z"/>
        </svg>
        <svg id="10015.io" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg"
             style={{position: "absolute", top: "5vh", left: "60vw", maxWidth: "840px"}}>
            <path fill={theme.palette.primary.main}
                  d="M342.5,317.5Q330,395,241,393.5Q152,392,124.5,316Q97,240,140.5,191Q184,142,252,122Q320,102,337.5,171Q355,240,342.5,317.5Z"/>
        </svg>
        <svg id="10015.io" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg"
             style={{position: "absolute", top: "50vh", left: "80vw", maxWidth: "840px"}}>
            <path fill={theme.palette.primary.main}
                  d="M360,270.5Q355,301,362,364Q369,427,312,394.5Q255,362,219.5,375.5Q184,389,141.5,377Q99,365,80.5,324.5Q62,284,84,245.5Q106,207,89.5,149.5Q73,92,133,103.5Q193,115,229.5,69.5Q266,24,314,43.5Q362,63,383,108.5Q404,154,384.5,197Q365,240,360,270.5Z"/>
        </svg>
        <svg id="10015.io" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg"
             style={{position: "absolute", top: "60vh", left: "30vw", maxWidth: "840px"}}>
            <path fill={theme.palette.primary.main}
                  d="M369.5,290Q360,340,315.5,379Q271,418,234,366.5Q197,315,154,301Q111,287,110.5,240Q110,193,118,118Q126,43,202.5,32Q279,21,301,95.5Q323,170,351,205Q379,240,369.5,290Z"/>
        </svg>
    </Box>
);