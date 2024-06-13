import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Circle from "./Global/Circle";
import {
  getSegments,
  getCourses,
  getLessons,
  getSciences,
} from "../services/studyProgramLearningService";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useTheme } from "@mui/material";

// const segmentData = [
//   {
//     id: 0,
//     name: "Trójkąty w świecie",
//     parentId: "core",
//     childrenIds: [1, 2, 3],
//     done: true,
//   },
//   {
//     id: 1,
//     name: "Podział ze względu na kąty",
//     parentId: 0,
//     childrenIds: [3],
//     done: true,
//   },
//   {
//     id: 2,
//     name: "Podział ze względu na boki",
//     parentId: 0,
//     childrenIds: [],
//     done: false,
//   },
//   {
//     id: 3,
//     name: "Własności trójkątów",
//     parentId: 1,
//     childrenIds: [],
//     done: false,
//   },
// ];

export default function Tree() {
  const theme = useTheme();

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [segmentsData, setSegmentsData] = useState({ data: null });
  const [mainSegmentId, setMainSegmentId] = useState(-1);
  const [childrenSegmentsIds, setChildrenSegmentsIds] = useState([]);

  const postepUsera = 0; //poprzez postep Usera rozumiem id poziomu, na ktorym ostatnio user skonczyl nauke
  //UWAGA: ZAMIAST 0 POWINNA ZOSTAC POBRANA ZMIENNA Z BACKENDU, KTORA MOWI O TYM, JAKI JEST POSTEP USERA
  useEffect(() => {
    setIsLoading(true);
    try {
      getSciences().then((sciences) =>
        getCourses(sciences.data[postepUsera].id).then((courses) =>
          getLessons(courses.data[postepUsera].id).then((lessons) =>
            getSegments(lessons.data[postepUsera].lesson.id).then(
              (segments) => {
                setSegmentsData(segments);
                setMainSegmentId(segments.data[postepUsera].segment.id);
                setChildrenSegmentsIds(
                  segments.data[postepUsera].segment.previousElement
                );
              }
            )
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
  if (!isLoading) {
    console.log(mainSegmentId);
    console.log(segmentsData.data);
  }
  // return (
  //   <Box
  //     sx={{
  //       flexGrow: 1,
  //       display: "grid",
  //       gridTemplateColumns: "0.8fr 0.1fr 0.8fr 0.1fr 0.8fr",
  //       gridTemplateRows: "1fr",
  //       gridTemplateAreas: `"parent arrow1 this-lesson arrow2 children" `,
  //     }}
  //   >
  //     {isLoading && <Typography>Poczekaj chwilę...</Typography>}
  //     {!isLoading && (
  //       <>
  //         <Box
  //           sx={{
  //             gridArea: "parent",
  //             display: "flex",
  //             flexDirection: "column",
  //           }}
  //           justifyContent="center"
  //           alignItems="center"
  //         >
  //           <Circle
  //             size="7vw"
  //             onClick={() => {
  //               setMainSegmentId(segmentsData[mainSegmentId].previousElement);
  //               setChildrenSegmentsIds(
  //                 segmentsData[segmentsData[mainSegmentId].previousElement]
  //                   .nextElements
  //               );
  //             }}
  //           >
  //             <Typography fontSize="4vw">
  //               {segmentsData[mainSegmentId].previousElement == "undefined" ||
  //               segmentsData[mainSegmentId].done === true
  //                 ? "✓"
  //                 : "✕"}
  //             </Typography>
  //           </Circle>

  //           <Typography
  //             fontSize="1vw"
  //             fontFamily="Baloo"
  //             sx={{ position: "absolute", marginTop: "10vw" }}
  //           >
  //             {segmentsData[mainSegmentId].previousElement != "undefined"
  //               ? segmentsData[segmentsData[mainSegmentId].previousElement].name
  //               : "Wstęp do działu Trójkąty"}
  //           </Typography>
  //         </Box>
  //         <Box
  //           sx={{
  //             gridArea: "arrow1",
  //             display: "flex",
  //             flexDirection: "column",
  //           }}
  //           justifyContent="center"
  //           alignItems="center"
  //         >
  //           <Typography>
  //             <ArrowForwardIosRoundedIcon
  //               sx={{ color: theme.palette.grey[500], fontSize: "4vw" }}
  //             />
  //           </Typography>
  //         </Box>
  //         <Box
  //           sx={{
  //             gridArea: "this-lesson",
  //             display: "flex",
  //             flexDirection: "column",
  //           }}
  //           justifyContent="center"
  //           alignItems="center"
  //         >
  //           <Circle size="12vw">
  //             <Typography fontSize="7vw">
  //               {segmentsData[mainSegmentId].done === true ? "✓" : "✕"}
  //             </Typography>
  //           </Circle>
  //           <Typography
  //             fontSize="2vw"
  //             fontFamily="Baloo"
  //             sx={{ position: "absolute", marginTop: "15vw" }}
  //           >
  //             {segmentsData[mainSegmentId].name}
  //           </Typography>
  //         </Box>
  //         <Box
  //           sx={{
  //             gridArea: "arrow2",
  //             display: "flex",
  //             flexDirection: "column",
  //           }}
  //           justifyContent="center"
  //           alignItems="center"
  //         >
  //           <Typography>
  //             {childrenSegmentsIds.length === 0 ? (
  //               ""
  //             ) : (
  //               <ArrowForwardIosRoundedIcon
  //                 sx={{ color: theme.palette.grey[500], fontSize: "4vw" }}
  //               />
  //             )}
  //           </Typography>
  //         </Box>
  //         <Box
  //           sx={{
  //             gridArea: "children",
  //             display: "flex",
  //             flexDirection: "column",
  //           }}
  //           justifyContent="center"
  //           alignItems="center"
  //         >
  //           {childrenSegmentsIds.map((item, index) => {
  //             if (childrenSegmentsIds.length === 3 && index === 1) {
  //               return (
  //                 <Grid
  //                   key={item}
  //                   sx={{
  //                     display: "flex",
  //                     marginLeft: "7vw",
  //                     flexDirection: "column",
  //                   }}
  //                   justifyContent="center"
  //                   alignItems="center"
  //                 >
  //                   <Circle
  //                     size="7vw"
  //                     onClick={() => {
  //                       setMainSegmentId(item);
  //                       setChildrenSegmentsIds(segmentsData[item].nextElements);
  //                     }}
  //                   >
  //                     <Typography fontSize="4vw">
  //                       {segmentsData[item].done === true ? "✓" : "✕"}
  //                     </Typography>
  //                   </Circle>
  //                   <Typography
  //                     fontSize="1vw"
  //                     fontFamily="Baloo"
  //                     sx={{
  //                       textAlign: "center",
  //                       m: 1,
  //                     }}
  //                   >
  //                     {segmentsData[item].name}
  //                   </Typography>
  //                 </Grid>
  //               );
  //             } else if (childrenSegmentsIds.length === 1) {
  //               return (
  //                 <Grid
  //                   key={item}
  //                   sx={{
  //                     display: "flex",
  //                     flexDirection: "column",
  //                   }}
  //                   justifyContent="center"
  //                   alignItems="center"
  //                 >
  //                   <Circle
  //                     size="7vw"
  //                     onClick={() => {
  //                       setMainSegmentId(item);
  //                       setChildrenSegmentsIds(segmentsData[item].nextElements);
  //                     }}
  //                   >
  //                     <Typography fontSize="4vw">
  //                       {segmentsData[item].done === true ? "✓" : "✕"}
  //                     </Typography>
  //                   </Circle>
  //                   <Typography
  //                     fontSize="1vw"
  //                     fontFamily="Baloo"
  //                     sx={{
  //                       textAlign: "center",
  //                       position: "absolute",
  //                       marginTop: "10vw",
  //                     }}
  //                   >
  //                     {segmentsData[item].name}
  //                   </Typography>
  //                 </Grid>
  //               );
  //             } else {
  //               return (
  //                 <Grid
  //                   key={item}
  //                   sx={{
  //                     display: "flex",
  //                     flexDirection: "column",
  //                   }}
  //                   justifyContent="center"
  //                   alignItems="center"
  //                 >
  //                   <Circle
  //                     size="7vw"
  //                     onClick={() => {
  //                       setMainSegmentId(item);
  //                       setChildrenSegmentsIds(segmentsData[item].nextElements);
  //                     }}
  //                   >
  //                     <Typography fontSize="4vw">
  //                       {segmentsData[item].done === true ? "✓" : "✕"}
  //                     </Typography>
  //                   </Circle>
  //                   <Typography
  //                     fontSize="1vw"
  //                     fontFamily="Baloo"
  //                     sx={{
  //                       textAlign: "center",
  //                       marginTop: 1,
  //                       marginBottom: 1,
  //                     }}
  //                   >
  //                     {segmentsData[item].name}
  //                   </Typography>
  //                 </Grid>
  //               );
  //             }
  //           })}
  //         </Box>
  //       </>
  //     )}
  //   </Box>
  // );
}
