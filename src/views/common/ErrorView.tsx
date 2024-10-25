import {Box, Grid, Typography, useTheme} from "@mui/material";
import NavLayout from "../layout/NavLayout";
import {useState} from "react";
import {Link} from "react-router-dom";
import DeadZombieFaceIcon from "../../components/customIcons/DeadZombieFaceIcon.js";
import React from "react";


export default function ErrorView({error}: { error: any }) {
    const theme = useTheme();
    const [showDetails, setShowDetails] = useState(false);

    const iconSize = "24rem";

    return (
        <NavLayout mode="flex" scroll>
            <Grid container flexGrow={1}>
                <Grid item xs={6}>
                    <Box sx={{position: "fixed", display: "grid", placeItems: "center", height: "100vh", width: "40%"}}>
                        <Box sx={{transform: "translateY(-20%)"}}>
                            <DeadZombieFaceIcon width={iconSize} height={iconSize}/>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6} sx={{padding: theme.spacing(4)}}>
                    <Typography variant="h2" color="grey" fontFamily={"Baloo"}>Coś poszło nie tak...</Typography>
                    <Typography padding={"1em 0"} variant="body1" color="initial">Spróbuj ponownie później lub
                        skontaktuj się ze specjalistą</Typography>
                    <Link to={"#"}
                          onClick={() => setShowDetails(true)}>
                        {'Zobacz szczegóły'}
                    </Link>
                    {
                        showDetails ? (
                            <Box sx={{width: "100%"}}>
                                <Typography>Kod błędu: {error.code ?? error}</Typography>
                                <Typography>Komunikat: {error.message}</Typography>
                            </Box>
                        ) : (<></>)
                    }
                </Grid>
            </Grid>
        </NavLayout>
    );
}