import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import RoundedButton from "../components/global/RoundedButton";
import { useTheme } from "@mui/material";
import { Box } from "@mui/material";

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
        }}>
        BIG ASS LOGO EDUTIE
      </Box>
      <Container
        direction="column"
        className="hero-gradient"
        sx={{
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
          <Grid sx={{ marginTop: theme.spacing(32) }}>
            <Typography align="center" color={theme.palette.accentSecond.dark} fontFamily={"Baloo"} variant="h5">
              Cześć!
            </Typography>
            <Typography
              sx={{ marginLeft: 5, marginRight: 5, marginBottom: 2 }}
              align="center"
              color={theme.palette.accentSecond.dark}
              fontFamily={"Geologica"}
              variant="body1">
              Tym razem to my jesteśmy nieprzygotowani i na urządzeniach mobilnych nasza strona nie jest jeszcze
              dostępna.
            </Typography>
            <Typography align="center" color={theme.palette.accentSecond.dark} fontFamily={"Geologica"} variant="body1">
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
              <img src="..\src\assets\img\pleading-face.png" alt="emoji" height="auto" width="35px" />
              <Grid
                container
                direction="row"
                sx={{
                  gap: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <img src="..\src\assets\img\right-hand.png" alt="emoji" height="auto" width="30px" />

                <img src="..\src\assets\img\left-hand.png" alt="emoji" height="auto" width="30px" />
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
                  leftIcon={<img src="../assets/svg/discord-logo.svg" alt="discord" height="auto" width="30px" />}
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
