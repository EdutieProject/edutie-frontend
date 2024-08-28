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
} from "@mui/material";

//CODE IMPORTS
import { useState, useEffect, useRef } from "react";
import {
  getCourses,
  getSciences,
} from "../services/studyProgramLearningService";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import LoadingView from "./common/LoadingView";

export default function CoursesView() {
  const theme = useTheme();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  let sciencesData = useRef([]);
  const [selectedScienceIndex, setSelectedScienceIndex] = useState(0);

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
    return <NavLayout>{error.code}</NavLayout>
  }

  if (isLoading) {
    return <LoadingView />;
  }


  let sciences = sciencesData.current;
  return (
    <NavLayout mode="flex">
      <Grid container direction="row" justifyContent="space-between">
        <CourseList scienceId={sciences[selectedScienceIndex].id} />
        <Grid>
          <Grid
            container
            item
            direction="row"
            justifyContent="space-between"
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
            <Typography fontSize="large">{sciences[selectedScienceIndex].name}</Typography>
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
          <img
            src=".\src\assets\img\ExampleImage.webp"
            alt="Science Picture"
            width={250}
          />
        </Grid>
      </Grid>
    </NavLayout>
  );
}

function CourseList({ scienceId }) {
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    getCourses(scienceId).then(coursesResponse => setAllCourses(coursesResponse.data));
  }, [scienceId]);

  return (<CourseFilter courses={allCourses} />);
}

function CourseFilter({ courses }) {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [displayedCourses, setDisplayedCourses] = useState(courses);

  useEffect(()=>{
    setDisplayedCourses(courses.slice((page - 1) * 3, page * 3));
  }, [courses, page]);

  console.log(displayedCourses);

  return (
    <Grid xs={8}>
      <TextField
        sx={{ marginBottom: 5 }}
        id="outlined-search"
        label="Wyszukaj kurs"
        type="search"
      // onChange={(event) => {
      //   setDisplayedCourses(
      //     courses.filter((course) =>
      //       course.name
      //         .toLocaleLowerCase()
      //         .includes(event.target.value.toLowerCase())
      //     )
      //   );
      // }}
      />
      {displayedCourses.map((item, index) => (
          <Surface sx={{ marginBottom: 6 }} key={index}>
            <Typography>{item.name}</Typography>
          </Surface>
        ))}
      {courses.length > 3 ? (
        <Pagination
          count={Math.ceil(courses.length / 3)}
          onChange={(e, value) => setPage(value)}
        />
      ) : (
        <Typography color={theme.palette.surface.main[200]}>
          To koniec wyszukiwań...
        </Typography>
      )}
    </Grid>
  );
}