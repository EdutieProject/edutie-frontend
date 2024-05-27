import { Button, Box, Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useState } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const dane = [
  {
    id: 0,
    name: "lekcja nr jeden",
    parentId: "core",
    childrenIds: [1, 2],
    done: true,
  },
  {
    id: 1,
    name: "lekcja nr dwa",
    parentId: 0,
    childrenIds: [3],
    done: true,
  },
  {
    id: 2,
    name: "lekcja nr trzy",
    parentId: 0,
    childrenIds: [],
    done: false,
  },
  {
    id: 3,
    name: "lekcja nr cztery",
    parentId: 1,
    childrenIds: [],
    done: false,
  },
];

const postepUsera = 0; //poprzez postep Usera rozumiem id poziomu, na ktorym ostatnio user skonczyl nauke

export default function Tree() {
  const [childrenLessons, setChildrenLessons] = useState(
    dane[postepUsera].childrenIds
  );
  const [lessonMain, setLessonMain] = useState(postepUsera);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          p: 1,
          m: 1,
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          borderRadius: 2,
        }}
      >
        <Grid
          xs={4}
          sx={{
            display: "flex",
            p: 1,
            m: 1,
            border: "1px solid",
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "grey.800" : "grey.300",
            borderRadius: 2,
          }}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            onClick={() => {
              setLessonMain(dane[lessonMain].parentId);
              setChildrenLessons(dane[dane[lessonMain].parentId].childrenIds);
            }}
            startIcon={
              dane[lessonMain].parentId != "core" &&
              dane[dane[lessonMain].parentId].done === true ? (
                <CheckCircleIcon />
              ) : (
                <RadioButtonUncheckedIcon />
              )
            }
          >
            {dane[lessonMain].parentId != "core"
              ? dane[dane[lessonMain].parentId].name
              : "Core"}
          </Button>
        </Grid>
        <Grid
          xs={4}
          sx={{
            display: "flex",
            p: 1,
            m: 1,
            border: "1px solid",
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "grey.800" : "grey.300",
            borderRadius: 2,
          }}
          justifyContent="center"
          alignItems="center"
        >
          <Button
            startIcon={
              dane[lessonMain].done === true ? (
                <CheckCircleIcon />
              ) : (
                <RadioButtonUncheckedIcon />
              )
            }
          >
            {dane[lessonMain].name}
          </Button>
        </Grid>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {childrenLessons.map((item) => {
            return (
              <Grid
                xs
                sx={{
                  display: "flex",
                  p: 1,
                  m: 1,
                }}
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  onClick={() => {
                    setLessonMain(item);
                    setChildrenLessons(dane[item].childrenIds);
                  }}
                  startIcon={
                    dane[item].done === true ? (
                      <CheckCircleIcon />
                    ) : (
                      <RadioButtonUncheckedIcon />
                    )
                  }
                >
                  {dane[item].name}
                </Button>
              </Grid>
            );
          })}
        </Box>
      </Box>
    </>
  );
}
