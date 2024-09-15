import { Box, Grid, TextField, useTheme, Typography } from "@mui/material";
import NavLayout from "./layout/NavLayout";
import Surface from "../components/global/Surface";
import RoundedButton from "../components/global/RoundedButton.jsx";
import CircleButton from "../components/global/CircleButton.jsx";
import { useState } from "react";

export default function LRDCreationView() {
  const theme = useTheme();
  const [buttonClicked, setButtonClicked] = useState(0);

  const questions = [
    {
      id: 0,
      question:
        "Opisz, czego nauczy się uczeń podczas rozwiązywania tego zadania oraz jaki zakres teorii ono obejmuje:",
    },
    {
      id: 1,
      question:
        "W kilku słowach wyszczególnij najważniejsze punkty zadania, czyli co uczeń osiągnie poprzez jego wykonanie:",
    },
    {
      id: 2,
      question: "Opisz szczegółowo, na czym będzie polegało dane zadanie:",
    },
    {
      id: 3,
      question:
        "Wypisz kilka możliwych trudności, z którymi spotka się uczeń podczas tego zadania (na ich podstawie generowane będą podpowiedzi):",
    },
  ];

  const [answers, setAnswers] = useState([
    {
      id: 0,
      answer: "",
    },
    {
      id: 1,
      answer: "",
    },
    {
      id: 2,
      answer: "",
    },
    {
      id: 3,
      answer: "",
    },
  ]);
  let localAnswers = [];
  function handleSubmission() {
    console.log(localAnswers);
    localStorage.clear();
    localStorage.setItem("ans", JSON.stringify(answers));
    localAnswers = JSON.parse(localStorage.getItem("ans"));
    setAnswers(localAnswers);
    console.log(localAnswers);
  }

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
              //   setFilteredReq(
              //     allReq.filter((req) =>
              //       req.name
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
            {questions[buttonClicked].question}
          </Typography>
        </Grid>
        <Grid container>
          <Grid xs item>
            <Surface>
              <Grid item sx={{ height: "30vh" }}>
                <TextField
                  value={answers[buttonClicked].answer} // JSON.parse(localStorage.getItem("ans"))[buttonClicked].answer
                  label="Wprowadź odpowiedź"
                  multiline
                  fullWidth
                  maxRows={6}
                  onChange={(event) => {
                    setAnswers(
                      answers.map((answer, index) => {
                        if (index === buttonClicked) {
                          return { ...answers, answer: event.target.value };
                        }
                        return answer;
                      })
                    );
                  }}
                />
              </Grid>
              <Grid
                container
                sx={{
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                {buttonClicked === 3 ? (
                  <RoundedButton
                    label={"Zapisz"}
                    active={true}
                    onClick={handleSubmission}
                  ></RoundedButton>
                ) : (
                  <RoundedButton
                    label={"Przejdź dalej"}
                    active={true}
                    onClick={() => {
                      setButtonClicked(buttonClicked + 1);
                    }}
                  ></RoundedButton>
                )}
              </Grid>
            </Surface>
          </Grid>
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
                  setButtonClicked(0);
                }}
                bgColor={buttonClicked === 0 ? "" : theme.palette.surface}
                id="firstButton"
                size={1}
              ></CircleButton>
            </Grid>
            <Grid item sx={{ marginBottom: theme.spacing(1) }}>
              <CircleButton
                onClick={() => {
                  setButtonClicked(1);
                }}
                bgColor={buttonClicked === 1 ? "" : theme.palette.surface}
                id="secondButton"
                size={1}
              ></CircleButton>
            </Grid>
            <Grid item sx={{ marginBottom: theme.spacing(1) }}>
              <CircleButton
                onClick={() => {
                  setButtonClicked(2);
                }}
                bgColor={buttonClicked === 2 ? "" : theme.palette.surface}
                id="thirdButton"
                size={1}
              ></CircleButton>
            </Grid>
            <Grid item sx={{ marginBottom: theme.spacing(1) }}>
              <CircleButton
                onClick={() => {
                  setButtonClicked(3);
                }}
                bgColor={buttonClicked === 3 ? "" : theme.palette.surface}
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
