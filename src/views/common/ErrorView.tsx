import {Box, Grid, Typography, useTheme} from "@mui/material";
import NavLayout from "../layout/NavLayout";
import {useState} from "react";
import {Link} from "react-router-dom";
import DeadZombieFaceIcon from "../../components/customIcons/DeadZombieFaceIcon.js";
import React from "react";
import {invalidAuthenticationCode} from "../../services/authenticationService";
import NoSessionView from "./NoSessionView";


export default function ErrorView({error}: { error: any }) {
    const theme = useTheme();
    const [showDetails, setShowDetails] = useState(false);

    const iconSize = "18rem";

    console.log(error.toString());

    if (error.code === invalidAuthenticationCode) {
        return <NoSessionView/>
    }

    return (
        <NavLayout scroll>
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
                        <a href={"https://discord.gg/bFXMnYB5c7"} target={"_blank"}> zgłoś błąd</a></Typography>
                    <Link to={"#"}
                          onClick={() => setShowDetails(true)}>
                        {'Zobacz szczegóły'}
                    </Link>
                    {
                        showDetails ? (
                            <>
                                {
                                    error.code ? (
                                        <Box sx={{width: "100%"}}>
                                            <Typography>Kod błędu: {error.code}</Typography>
                                            <Typography>
                                                Komunikat: <br/>
                                                <code style={{padding: "0.2rem", borderRadius: theme.shape.borderRadius, backgroundColor: theme.palette.grey["100"]}}>
                                                    {error.message}
                                                </code>
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Box sx={{width: "100%"}}>
                                            <Typography>
                                                Błąd:<br/>
                                                <code>
                                                    {typeof error === 'object' ? error.toString() : error}
                                                </code>
                                            </Typography>
                                        </Box>
                                    )
                                }
                            </>

                        ) : (<></>)
                    }
                </Grid>
            </Grid>
        </NavLayout>
    );
}