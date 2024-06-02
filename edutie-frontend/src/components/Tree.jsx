import { Button, Box, Grid, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useState } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Circle from "./Global/Circle";

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
    <Box
      sx={{
        border: "1px solid",
        borderColor: "blue",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "0.8fr 0.8fr 0.8fr 0.8fr 0.8fr",
        gridTemplateRows: "1fr 1fr",
        gridTemplateAreas: `"parent connect1 this-lesson connect2 children" "parent connect1 this-lesson connect3 children"`,
      }}
    >
      <Box
        sx={{
          border: "1px solid",
          borderColor: "green",
          gridArea: "parent",
          display: "flex",
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Circle
          size="5vw"
          onClick={() => {
            setLessonMain(dane[lessonMain].parentId);
            setChildrenLessons(dane[dane[lessonMain].parentId].childrenIds);
          }}
        >
          {dane[lessonMain].parentId != "core" &&
          dane[lessonMain].done === true ? (
            <CheckCircleIcon />
          ) : (
            <RadioButtonUncheckedIcon />
          )}
        </Circle>
        <Typography sx={{ m: 1 }}>
          {dane[lessonMain].parentId != "core"
            ? dane[dane[lessonMain].parentId].name
            : "Core"}
        </Typography>
      </Box>
      <Box
        sx={{
          gridArea: "connect1",
          border: "1px solid",
          borderColor: "green",
          display: "flex",
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h3" color="grey">
          – – – – –
        </Typography>
      </Box>
      <Box
        sx={{
          border: "1px solid",
          borderColor: "green",
          gridArea: "this-lesson",
          display: "flex",
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Circle size="8vw">
          {dane[lessonMain].done === true ? (
            <CheckCircleIcon />
          ) : (
            <RadioButtonUncheckedIcon />
          )}
        </Circle>
        <Typography sx={{ m: 1 }}>{dane[lessonMain].name}</Typography>
      </Box>
      <Box
        sx={{
          gridArea: "connect2",
          border: "1px solid",
          borderColor: "green",
          display: "flex",
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          sx={{ transform: "rotate(-15deg)" }}
          variant="h3"
          color="grey"
        >
          – – – – –
        </Typography>
      </Box>
      <Box
        sx={{
          gridArea: "connect3",
          border: "1px solid",
          borderColor: "green",
          display: "flex",
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          sx={{ transform: "rotate(15deg)" }}
          variant="h3"
          color="grey"
        >
          – – – – –
        </Typography>
      </Box>
      <Box
        sx={{
          border: "1px solid",
          borderColor: "green",
          gridArea: "children",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {childrenLessons.map((item) => {
          return (
            <Grid
              sx={{
                display: "flex",
                p: 1,
                m: 1,
              }}
              justifyContent="center"
              alignItems="center"
            >
              <Circle
                size="5vw"
                onClick={() => {
                  setLessonMain(item);
                  setChildrenLessons(dane[item].childrenIds);
                }}
              >
                {dane[item].done === true ? (
                  <CheckCircleIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </Circle>
              <Typography sx={{ m: 1 }}>{dane[item].name}</Typography>
            </Grid>
          );
        })}
      </Box>
    </Box>
  );
}
