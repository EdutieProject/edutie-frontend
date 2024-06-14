import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Circle from "./global/Circle";
import {
  getSegments,
  getCourses,
  getLessons,
  getSciences,
} from "../services/studyProgramLearningService";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useTheme } from "@mui/material";

export default function Tree() {
  const theme = useTheme();

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [segmentsData, setSegmentsData] = useState({ data: null });
  const [mainSegment, setMainSegment] = useState({ data: null });
  const [childrenSegmentsIds, setChildrenSegmentsIds] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    try {
      getSciences().then((sciences) =>
        getCourses(sciences.data[0].id).then((courses) =>
          getLessons(courses.data[0].id).then((lessons) =>
            getSegments(lessons.data[0].lesson.id).then((segments) => {
              setSegmentsData(segments);
              setMainSegment(
                segments.data.find((o) => o.segment.previousElement === null)
              );
              setChildrenSegmentsIds(
                segments.data.find((o) => o.segment.previousElement === null)
                  .segment.nextElements
              );
            })
          )
        )
      );
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, []);
  if (error) {
    return error.name;
  }

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
      {isLoading && <Typography>Poczekaj chwilę...</Typography>}
      {!isLoading &&
        segmentsData.data !== undefined &&
        segmentsData.data !== null && (
          <>
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
                  if (mainSegment.segment.previousElement !== null) {
                    setMainSegment(
                      segmentsData.data.find(
                        (o) =>
                          o.segment.id ===
                          mainSegment.segment.previousElement.id
                      )
                    );
                    setChildrenSegmentsIds(mainSegment.segment.nextElements);
                  }
                }}
              >
                <Typography fontSize="4vw">
                  {mainSegment.segment.previousElement === null
                    ? "✓"
                    : segmentsData.data.find(
                        (o) =>
                          o.segment.id ===
                          mainSegment.segment.previousElement.id
                      ).segment.done === true
                    ? "✓"
                    : "✕"}
                </Typography>
              </Circle>

              <Typography
                fontSize="1vw"
                fontFamily="Baloo"
                sx={{ position: "absolute", marginTop: "10vw" }}
              >
                {mainSegment.segment.previousElement != null
                  ? segmentsData.data.find(
                      (o) =>
                        o.segment.id === mainSegment.segment.previousElement.id
                    ).segment.name
                  : "Wstęp"}
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
                  {mainSegment.done === true ? "✓" : "✕"}
                </Typography>
              </Circle>
              <Typography
                fontSize="2vw"
                fontFamily="Baloo"
                sx={{ position: "absolute", marginTop: "15vw" }}
              >
                {mainSegment.segment.name}
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
                {childrenSegmentsIds.length === 0 ? (
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
              {childrenSegmentsIds.map((item, index) => {
                if (childrenSegmentsIds.length === 3 && index === 1) {
                  return (
                    <Grid
                      key={index}
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
                          setMainSegment(
                            segmentsData.data.find(
                              (o) => o.segment.id === item.id
                            )
                          );
                          setChildrenSegmentsIds(
                            mainSegment.segment.nextElements
                          );
                        }}
                      >
                        <Typography fontSize="4vw">
                          {segmentsData.data.find(
                            (o) => o.segment.id === item.id
                          ).done === true
                            ? "✓"
                            : "✕"}
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
                        {
                          segmentsData.data.find(
                            (o) => o.segment.id === item.id
                          ).segment.name
                        }
                      </Typography>
                    </Grid>
                  );
                } else if (childrenSegmentsIds.length === 1) {
                  return (
                    <Grid
                      key={index}
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
                          setMainSegment(
                            segmentsData.data.find(
                              (o) => o.segment.id === item.id
                            )
                          );
                          setChildrenSegmentsIds(
                            mainSegment.segment.nextElements
                          );
                        }}
                      >
                        <Typography fontSize="4vw">
                          {segmentsData.data.find(
                            (o) => o.segment.id === item.id
                          ).done === true
                            ? "✓"
                            : "✕"}
                        </Typography>
                      </Circle>
                      <Typography
                        fontSize="1vw"
                        fontFamily="Baloo"
                        sx={{
                          textAlign: "center",
                          position: "absolute",
                          marginTop: "10vw",
                        }}
                      >
                        {
                          segmentsData.data.find(
                            (o) => o.segment.id === item.id
                          ).segment.name
                        }
                      </Typography>
                    </Grid>
                  );
                } else {
                  return (
                    <Grid
                      key={index}
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
                          setMainSegment(
                            segmentsData.data.find(
                              (o) => o.segment.id === item.id
                            )
                          );
                          setChildrenSegmentsIds(
                            mainSegment.segment.nextElements
                          );
                        }}
                      >
                        <Typography fontSize="4vw">
                          {segmentsData.data.find(
                            (o) => o.segment.id === item.id
                          ).done === true
                            ? "✓"
                            : "✕"}
                        </Typography>
                      </Circle>
                      <Typography
                        fontSize="1vw"
                        fontFamily="Baloo"
                        sx={{
                          textAlign: "center",
                          marginTop: 1,
                          marginBottom: 1,
                        }}
                      >
                        {
                          segmentsData.data.find(
                            (o) => o.segment.id === item.id
                          ).segment.name
                        }
                      </Typography>
                    </Grid>
                  );
                }
              })}
            </Box>
          </>
        )}
    </Box>
  );
}
