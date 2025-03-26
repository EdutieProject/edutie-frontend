import {Box, Typography, useTheme} from "@mui/material";
import Grid from "@mui/material/Grid2"
import NavLayout from "src/views/common/NavLayout";
import React, {useState} from "react";
import {Link} from "react-router";
import {invalidAuthenticationCode} from "src/services/authenticationService";
import NoSessionView from "./NoSessionView";
import astonished from "src/assets/svg/emoji/astonished.svg"


export default function ErrorView({error}: { error: any }) {
    const theme = useTheme();
    const [showDetails, setShowDetails] = useState(false);

    const iconSize = "240"; // in px

    if (error.code === invalidAuthenticationCode) {
        return <NoSessionView/>
    }

    return (
        <NavLayout scroll variant={"none"}>
            <Grid container flexGrow={1} spacing={6} paddingBottom={6}>
                <Grid size={{xs: 12, md: 6}} sx={{display: "grid", placeItems: "center"}}>
                        <Box sx={{display: "grid", placeItems: "center"}}>
                            <img width={iconSize} src={astonished} alt={"dead"}/>
                        </Box>
                </Grid>
                <Grid size={{xs: 12, md: 6}} sx={{display: "grid", placeItems: "center"}}>
                    <Box>
                        <Typography variant="h2" color="grey" fontFamily={"Baloo"}>Something went wrong</Typography>
                        <Typography padding={"1em 0"} variant="body1" color="initial">Try again later or
                            <a href={"https://discord.gg/bFXMnYB5c7"}> submit an issue </a></Typography>
                        <Link to={"#"}
                              onClick={() => setShowDetails(true)}>
                            {'See more'}
                        </Link>
                        {
                            showDetails ? (
                                <Box sx={{width: "100%"}}>
                                    <Typography>Error code: {error.code ?? error}</Typography>
                                    <Typography>Message: {error.message}</Typography>
                                </Box>
                            ) : (<></>)
                        }
                    </Box>
                </Grid>
            </Grid>
        </NavLayout>
    );
}