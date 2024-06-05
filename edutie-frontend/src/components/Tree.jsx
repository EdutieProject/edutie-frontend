import { Box, Grid, Typography } from "@mui/material";
import React, { useReducer, useState } from "react";
import Circle from "./Global/Circle";
import { getSegments } from "../services/studyProgramLearningService";

//const segmentData = getSegments("ID SEGMENTU POSTEPU USERA/OSTATNI DONE")

const segmentData = [
  {
    id: 0,
    name: "Trójkąty w świecie",
    parentId: "core",
    childrenIds: [1, 2, 3],
    done: true,
  },
  {
    id: 1,
    name: "Podział ze względu na kąty",
    parentId: 0,
    childrenIds: [3],
    done: true,
  },
  {
    id: 2,
    name: "Podział ze względu na boki",
    parentId: 0,
    childrenIds: [],
    done: false,
  },
  {
    id: 3,
    name: "Własności trójkątów",
    parentId: 1,
    childrenIds: [],
    done: false,
  },
];

const postepUsera = 0; //poprzez postep Usera rozumiem id poziomu, na ktorym ostatnio user skonczyl nauke

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "DECREASE":
//       return {
//         mainLesson: segmentData[mainLesson].parentId,
//         childrenLessons:
//           segmentData[segmentData[mainLesson].parentId].childrenIds,
//       };
//   }
// };

export default function Tree() {
  // const [state, dispatch] = useReducer(reducer, {mainLesson: postepUsera, childrenLessons: segmentData[postepUsera].childrenIds})
  const [mainLesson, setMainLesson] = useState(postepUsera);
  const [childrenLessons, setChildrenLessons] = useState(
    segmentData[postepUsera].childrenIds
  );

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "0.8fr  0.8fr  0.8fr",
        gridTemplateRows: "1fr",
        gridTemplateAreas: `"parent this-lesson children" `,
      }}
    >
      <Box
        sx={{
          gridArea: "parent",
          display: "flex",
          flexDirection: "column",
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Circle
          size="7vw"
          onClick={() => {
            setMainLesson(segmentData[mainLesson].parentId);
            setChildrenLessons(
              segmentData[segmentData[mainLesson].parentId].childrenIds
            );
          }}
        >
          <Typography fontSize="4vw">
            {segmentData[mainLesson].parentId == "core" &&
            segmentData[mainLesson].done === true
              ? "✓"
              : "✕"}
          </Typography>
        </Circle>

        <Typography sx={{ m: 1 }}>
          {segmentData[mainLesson].parentId != "core"
            ? segmentData[segmentData[mainLesson].parentId].name
            : "Wstęp do działu Trójkąty"}
        </Typography>
      </Box>
      <Box
        sx={{
          gridArea: "this-lesson",
          display: "flex",
          flexDirection: "column",
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Circle size="12vw">
          <Typography fontSize="7vw">
            {segmentData[mainLesson].done === true ? "✓" : "✕"}
          </Typography>
        </Circle>
        <Typography sx={{ m: 1 }}>{segmentData[mainLesson].name}</Typography>
      </Box>
      <Box
        sx={{
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
                flexDirection: "column",
              }}
              justifyContent="center"
              alignItems="center"
            >
              <Circle
                size="6vw"
                onClick={() => {
                  setMainLesson(item);
                  setChildrenLessons(segmentData[item].childrenIds);
                }}
              >
                <Typography fontSize="3vw">
                  {segmentData[item].done === true ? "✓" : "✕"}
                </Typography>
              </Circle>
              <Typography sx={{ m: 1 }}>{segmentData[item].name}</Typography>
            </Grid>
          );
        })}
      </Box>
    </Box>
  );
}
