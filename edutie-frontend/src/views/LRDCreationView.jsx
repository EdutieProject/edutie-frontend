import { Box, Grid, TextField, useTheme, Typography } from "@mui/material";
import NavLayout from "./layout/NavLayout";
import Surface from "../components/global/Surface";
import RoundedButton from "../components/global/RoundedButton.jsx";
import CircleButton from "../components/global/CircleButton.jsx";
import { useState } from "react";

export default function LRDCreationView() {
  const theme = useTheme();
  const [buttonClicked, setButtonClicked] = useState("firstButton");
  const [firstButtonColor, setFirstButtonColor] = useState(
    theme.palette.surface
  );
  const [secondButtonColor, setSecondButtonColor] = useState(
    theme.palette.surface
  );
  const [thirdButtonColor, setThirdButtonColor] = useState(
    theme.palette.surface
  );
  const [fourthButtonColor, setFourthButtonColor] = useState(
    theme.palette.surface
  );

  return (
    <NavLayout mode="flex">
      <Typography fontFamily={"Baloo"} variant="h4">
        Wysokość w trójkącie (segment/lesson name)
      </Typography>
      <Typography sx={{ marginBottom: theme.spacing(2) }} variant="subtitle1">
        Description.
      </Typography>

      <Box>
        <Grid
          sx={{
            marginBottom: theme.spacing(2),
          }}
          item
          xs={4}
        >
          <TextField
            id="outlined-search"
            label="Wyszukaj wymaganie"
            type="search"
            onChange={(event) => {
              console.log(event.target.value.toLowerCase());
              //   setFilteredCourses(
              //     allCourses.filter((course) =>
              //       course.name
              //         .toLocaleLowerCase()
              //         .includes(event.target.value.toLowerCase())
              //     )
              //   );
            }}
          />
        </Grid>
        <Grid
          container
          sx={{
            marginBottom: theme.spacing(3),
            gap: theme.spacing(10),
          }}
        >
          <Grid item xs>
            <Surface sx={{ height: "10vh" }}></Surface>
          </Grid>
          <Grid item xs>
            <Surface sx={{ height: "10vh" }}></Surface>
          </Grid>
          <Grid item xs>
            <Surface sx={{ height: "10vh" }}></Surface>
          </Grid>
          <Grid item xs>
            <Surface sx={{ height: "10vh" }}></Surface>
          </Grid>
        </Grid>

        <Grid sx={{ marginBottom: theme.spacing(2) }}>
          <Typography fontFamily={"Baloo"} variant="h6">
            Opisz szczegółowo, na czym będzie polegało dane zadanie i czego
            dotyczy:
          </Typography>
        </Grid>
        <Grid container>
          <InputSurface buttonClicked={buttonClicked}></InputSurface>
          {/* <Grid xs item>
            <Surface>
              <Grid item sx={{ height: "30vh" }}>
                <TextField
                  label="Wprowadź odpowiedź"
                  multiline
                  fullWidth
                  maxRows={6}
                />
              </Grid>
              <Grid
                container
                sx={{
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <RoundedButton
                  label={"Zapisz i przejdź dalej"}
                  active={true}
                ></RoundedButton>
              </Grid>
            </Surface>
          </Grid> */}
          <Grid
            container
            direction="column"
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
            xs={1}
          >
            <Grid item sx={{ marginBottom: theme.spacing(1) }}>
              <CircleButton
                onClick={() => {
                  setButtonClicked("firstButton");
                  setSecondButtonColor(theme.palette.surface);
                  setFirstButtonColor("");
                  setFourthButtonColor(theme.palette.surface);
                  setThirdButtonColor(theme.palette.surface);
                }}
                bgColor={firstButtonColor}
                id="firstButton"
                size={1}
              ></CircleButton>
            </Grid>
            <Grid item sx={{ marginBottom: theme.spacing(1) }}>
              <CircleButton
                onClick={() => {
                  setButtonClicked("secondButton");
                  setSecondButtonColor("");
                  setFirstButtonColor(theme.palette.surface);
                  setFourthButtonColor(theme.palette.surface);
                  setThirdButtonColor(theme.palette.surface);
                }}
                bgColor={secondButtonColor}
                id="secondButton"
                size={1}
              ></CircleButton>
            </Grid>
            <Grid item sx={{ marginBottom: theme.spacing(1) }}>
              <CircleButton
                onClick={() => {
                  setButtonClicked("thirdButton");
                  setSecondButtonColor(theme.palette.surface);
                  setFirstButtonColor(theme.palette.surface);
                  setFourthButtonColor(theme.palette.surface);
                  setThirdButtonColor("");
                }}
                bgColor={thirdButtonColor}
                id="thirdButton"
                size={1}
              ></CircleButton>
            </Grid>
            <Grid item sx={{ marginBottom: theme.spacing(1) }}>
              <CircleButton
                onClick={() => {
                  setButtonClicked("fourthButton");
                  setSecondButtonColor(theme.palette.surface);
                  setFirstButtonColor(theme.palette.surface);
                  setFourthButtonColor("");
                  setThirdButtonColor(theme.palette.surface);
                }}
                bgColor={fourthButtonColor}
                id="fourthButton"
                size={1}
              ></CircleButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </NavLayout>
  );
}

const InputSurface = ({ buttonClicked }) => {
  const theme = useTheme();
  console.log(buttonClicked);
  return (
    <Grid xs item>
      <Surface>
        <Grid item sx={{ height: "30vh" }}>
          <TextField
            label="Wprowadź odpowiedź"
            multiline
            fullWidth
            maxRows={6}
          />
        </Grid>
        <Grid
          container
          sx={{
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <RoundedButton
            label={"Zapisz i przejdź dalej"}
            active={true}
          ></RoundedButton>
        </Grid>
      </Surface>
    </Grid>
  );
};
