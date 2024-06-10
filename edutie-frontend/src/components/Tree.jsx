import { Box, Grid, Typography } from "@mui/material";
import React, { useReducer, useState } from "react";
import Circle from "./Global/Circle";
import { getSegments } from "../services/studyProgramLearningService";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useTheme } from "@mui/material";

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
  const theme = useTheme();
  // const [state, dispatch] = useReducer(reducer, {mainLesson: postepUsera, childrenLessons: segmentData[postepUsera].childrenIds})
  const [mainLesson, setMainLesson] = useState(postepUsera);
  const [childrenLessons, setChildrenLessons] = useState(
    segmentData[postepUsera].childrenIds
  );
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "grid",
        gridTemplateColumns: "0.8fr 0.1fr 0.8fr 0.1fr 0.8fr",
        gridTemplateRows: "1fr",
        gridTemplateAreas: `"parent arrow1 this-lesson arrow2 children" `,
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

        <Typography
          fontSize="1vw"
          fontFamily="Baloo"
          sx={{ position: "absolute", marginTop: "10vw" }}
        >
          {segmentData[mainLesson].parentId != "core"
            ? segmentData[segmentData[mainLesson].parentId].name
            : "Wstęp do działu Trójkąty"}
        </Typography>
      </Box>
      <Box
        sx={{
          gridArea: "arrow1",
          display: "flex",
          flexDirection: "column",
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Typography>
          <ArrowForwardIosRoundedIcon
            sx={{ color: theme.palette.grey[500], fontSize: "4vw" }}
          />
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
        <Typography
          fontSize="2vw"
          fontFamily="Baloo"
          sx={{ position: "absolute", marginTop: "15vw" }}
        >
          {segmentData[mainLesson].name}
        </Typography>
      </Box>
      <Box
        sx={{
          gridArea: "arrow2",
          display: "flex",
          flexDirection: "column",
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Typography>
          {childrenLessons.length === 0 ? (
            ""
          ) : (
            <ArrowForwardIosRoundedIcon
              sx={{ color: theme.palette.grey[500], fontSize: "4vw" }}
            />
          )}
        </Typography>
      </Box>
      <Box
        sx={{
          gridArea: "children",
          display: "flex",
          flexDirection: "column",
        }}
        justifyContent="center"
        alignItems="center"
      >
        {childrenLessons.map((item, index) => {
          if (childrenLessons.length === 3 && index === 1) {
            return (
              <Grid
                key={item}
                sx={{
                  display: "flex",
                  marginLeft: "7vw",
                  flexDirection: "column",
                }}
                justifyContent="center"
                alignItems="center"
              >
                <Circle
                  size="7vw"
                  onClick={() => {
                    setMainLesson(item);
                    setChildrenLessons(segmentData[item].childrenIds);
                  }}
                >
                  <Typography fontSize="4vw">
                    {segmentData[item].done === true ? "✓" : "✕"}
                  </Typography>
                </Circle>
                <Typography
                  fontSize="1vw"
                  fontFamily="Baloo"
                  sx={{
                    textAlign: "center",
                    m: 1,
                  }}
                >
                  {segmentData[item].name}
                </Typography>
              </Grid>
            );
          } else {
            return (
              <Grid
                key={item}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
                justifyContent="center"
                alignItems="center"
              >
                <Circle
                  size="7vw"
                  onClick={() => {
                    setMainLesson(item);
                    setChildrenLessons(segmentData[item].childrenIds);
                  }}
                >
                  <Typography fontSize="4vw">
                    {segmentData[item].done === true ? "✓" : "✕"}
                  </Typography>
                </Circle>
                <Typography
                  fontSize="1vw"
                  fontFamily="Baloo"
                  sx={{
                    textAlign: "center",
                    m: 1,
                    // position: "absolute",
                    // marginTop: "10vw",
                  }}
                >
                  {segmentData[item].name}
                </Typography>
              </Grid>
            );
          }
        })}
      </Box>
    </Box>
  );
}
