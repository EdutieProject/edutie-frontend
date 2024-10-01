//LAYOUT IMPORTS
import NavLayout from "./layout/NavLayout";
import Surface from "../components/global/Surface";
import {
  Typography,
  useTheme,
  Grid,
  TextField,
  IconButton,
  Pagination,
  Box,
  Skeleton,
} from "@mui/material";

//CODE IMPORTS
import { useState, useEffect, useRef } from "react";
import {
  getCourses,
  getSciences,
} from "../services/studyProgramLearningService";
import { ChevronLeft, ChevronRight, QuestionMark, Search } from "@mui/icons-material";
import LoadingView from "./common/LoadingView";
import Heading from "../components/global/Heading";
import CircleButton from "../components/global/CircleButton";
import { useNavigate } from "react-router-dom";
import { navigationPath, navSections } from "../features/navigation";
import ErrorView from "./common/ErrorView";

export default function CoursesView() {
  const theme = useTheme();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  let sciencesData = useRef([]);
  const [selectedScienceIndex, setSelectedScienceIndex] = useState(0);

  /** A state broker is here - transferring state between CourseList and higher-level view component  */
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getSciences()
      .then(
        sciencesResponse => {
          sciencesData.current = sciencesResponse.data;
          setError(sciencesResponse.error);
        },
      )
      .finally(() => setIsLoading(false));
  }, []);

  if (error) {
    return <ErrorView error={error} />
  }

  if (isLoading) {
    return <LoadingView />;
  }

  let sciences = sciencesData.current;
  let selectedScience = sciences[selectedScienceIndex];
  return (
    <NavLayout mode="flex" activeSectionIdOverride={navSections.courses} scroll>
      <Grid container direction="row" justifyContent="space-between" gap={theme.spacing(14)}>
        <CourseList scienceId={selectedScience.id} setErrorInView={setError} />
        <Grid sx={{ flexGrow: 1 }}>
          <Grid
            item
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            marginBottom="20px"
          >
            <IconButton
              sx={{ color: "black" }}
              onClick={() => {
                if (sciences[selectedScienceIndex - 1]) {
                  setSelectedScienceIndex(selectedScienceIndex - 1);
                }
              }}
            >
              <ChevronLeft />
            </IconButton>
            <Heading variant="h5">{selectedScience.name}</Heading>
            <IconButton
              sx={{ color: "black" }}
              onClick={() => {
                if (sciences[selectedScienceIndex + 1]) {
                  setSelectedScienceIndex(selectedScienceIndex + 1);
                }
              }}
            >
              <ChevronRight />
            </IconButton>
          </Grid>
          <Box sx={{ display: "grid", placeItems: "center" }}>
            <img
              src={selectedScience.imageSource === null ? 
                "https://as2.ftcdn.net/v2/jpg/05/79/64/29/1000_F_579642932_z3CUhYjjYWcGIWJtO30pMyYVFpDyoa1W.jpg" 
                : selectedScience.imageSource}
              alt="Science Picture"
              width={250}
              style={{ aspectRatio: 1 / 1, objectFit: "cover", borderRadius: theme.shape.roundedRadius }}
            />
          </Box>
          <Box sx={{width: "100%", my: theme.spacing(4), textAlign: "center"}}>
              <Typography color="grey" variant="overline">{selectedScience.description}</Typography>
          </Box>
        </Grid>
      </Grid>
    </NavLayout>
  );
}

function CourseList({ scienceId, setErrorInView }) {
  const theme = useTheme();
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourses(scienceId).then(coursesResponse => {
      if (coursesResponse.error !== null) {
        setErrorInView(coursesResponse.error);
        return;
      }
      setAllCourses(coursesResponse.data);
      setFilteredCourses(coursesResponse.data);
      setLoading(false);
    });
  }, [scienceId]);

  console.log(filteredCourses); // Note that the list is rendered twice with already proper data

  const skeletonCourseTileSize = "14rem";

  if (loading) {
    return (
      <Grid xs={8}>
        <TextField
          sx={{ marginBottom: theme.spacing(2) }}
          id="outlined-search"
          label="Wyszukaj kurs"
          type="search"
          onChange={(event) => {
            console.log(event.target.value.toLowerCase());
            setFilteredCourses(
              allCourses.filter((course) =>
                course.name
                  .toLocaleLowerCase()
                  .includes(event.target.value.toLowerCase())
              )
            );
          }}
          disabled
        />
        <Skeleton animation="wave" height={skeletonCourseTileSize} />
        <Skeleton animation="wave" height={skeletonCourseTileSize} />
        <Skeleton animation="wave" height={skeletonCourseTileSize} />
      </Grid>
    );
  }

  return (
    <Grid xs={8}>
      <TextField
        sx={{ marginBottom: theme.spacing(2) }}
        id="outlined-search"
        label="Wyszukaj kurs"
        type="search"
        onChange={(event) => {
          console.log(event.target.value.toLowerCase());
          setFilteredCourses(
            allCourses.filter((course) =>
              course.name
                .toLocaleLowerCase()
                .includes(event.target.value.toLowerCase())
            )
          );
        }}
      />
      {
        filteredCourses
          .slice((page - 1) * 3, page * 3)
          .map((course, index) => <CourseTile course={course} key={index} />)
      }
      <Pagination
        count={Math.ceil(filteredCourses.length / 3)}
        onChange={(e, value) => setPage(value)}
      />
    </Grid>
  );
}

const CourseTile = ({ course }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Surface sx={{ my: theme.spacing(4), display: "flex", gap: theme.spacing(4) }}>
      <Box width={"15%"} sx={{ display: "grid", placeItems: "center"}}>
        <img src={course.imageSource === null ?
          "https://thumbs.dreamstime.com/b/trigonometry-formula-line-icon-vector-illustration-sign-isolated-contour-symbol-black-331770196.jpg"
          : course.imageSource}
          width="100%"
          style={{ aspectRatio: 1 / 1, objectFit: "cover", borderRadius: theme.shape.borderRadius }}
        />
      </Box>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Heading variant={"h4"}>{course.name}</Heading>
          <Box sx={{ display: "flex", flexDirection: "row", gap: theme.spacing(2) }}>
            {course.courseTags.map(tag =>
              <Box sx={{ borderRadius: theme.shape.roundedRadius, backgroundColor: theme.palette.secondary.main, px: theme.spacing(2), py: theme.spacing(1), display: "grid", placeItems: "center" }}>
                {tag.name}
              </Box>
            )}
          </Box>
        </Box>
        <Typography variant="body1">
          {course.description}
        </Typography>
        <Box sx={{ mt: theme.spacing(1), display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Box sx={{ display: "grid", placeItems: "center" }}>
            <Box sx={{ display: "flex", flexDirection: "row", gap: theme.spacing(2) }}>
              <QuestionMark color={theme.palette.common.black} /> Autor nieznany
            </Box>
          </Box>
          <CircleButton size={theme.spacing(3)} onClick={() => navigate(navigationPath.fillPath(navigationPath.lessonTree, course.id))}>
            <Typography fontFamily={"Baloo"} fontSize={24} color={theme.palette.common.white}>{">"}</Typography>
          </CircleButton>
        </Box>
      </Box>
    </Surface>
  );
}
