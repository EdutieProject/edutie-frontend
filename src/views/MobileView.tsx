import {Box, Container, Grid, Typography, useTheme} from "@mui/material";
import React from "react";
import RoundedButton from "../components/global/RoundedButton";
import logo from "../assets/img/logo.png"
import leftHand from "../assets/img/left-hand.png"
import rightHand from "../assets/img/right-hand.png"
import pleadingFace from "../assets/img/pleading-face.png"

export default function MobileView() {
    const theme = useTheme();
    return (
        <>
            <Box
                id="header"
                sx={{
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 80%)",
                    backgroundColor: "white",
                    height: 200,
                    marginBottom: 20,
                    margin: 0,
                    position: "absolute",
                    width: "100%",
                    display: "grid",
                    placeItems: "center"
                }}>
                <img src={logo} alt={"logo"} width={"50%"}/>
            </Box>
            <Container
                className="hero-gradient"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Grid
                    container
                    direction="row"
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Grid sx={{marginTop: theme.spacing(32)}}>
                        <Typography align="center" color={theme.palette.accentSecond.dark} fontFamily={"Baloo"}
                                    variant="h5">
                            Cześć!
                        </Typography>
                        <Typography
                            sx={{marginLeft: 5, marginRight: 5, marginBottom: 2}}
                            align="center"
                            color={theme.palette.accentSecond.dark}
                            fontFamily={"Geologica"}
                            variant="body1">
                            Tym razem to my jesteśmy nieprzygotowani i na urządzeniach mobilnych nasza strona nie jest
                            jeszcze
                            dostępna.
                        </Typography>
                        <Typography align="center" color={theme.palette.accentSecond.dark} fontFamily={"Geologica"}
                                    variant="body1">
                            ...chyba będzie minus do dzienniczka.
                        </Typography>
                        <Grid
                            container
                            direction="column"
                            sx={{
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: theme.spacing(2),
                            }}>
                            <img src={pleadingFace} alt="emoji" height="auto" width="70px"/>
                            <Grid
                                container
                                direction="row"
                                sx={{
                                    gap: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                <img src={rightHand} alt="emoji" height="auto" width="30px"/>

                                <img src={leftHand} alt="emoji" height="auto" width="30px"/>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            sx={{
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 5,
                            }}>
                            <a href="https://discord.com/invite/UAYCpZXFAE">
                                <RoundedButton
                                    sx={{
                                        backgroundColor: "transparent",
                                        border: 2,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: 3,
                                    }}
                                    rightIcon={<img src="https://www.svgrepo.com/show/353655/discord-icon.svg"
                                                    alt="discord" height="auto" width="30px"/>}
                                    label={"Dołącz do discorda"}
                                    active={true}></RoundedButton>
                            </a>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
