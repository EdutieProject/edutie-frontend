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
import { useState, useEffect } from "react";
import {
  getCourses,
  getSciences,
} from "../services/studyProgramLearningService";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export default function CoursesView() {
  const theme = useTheme();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [coursesData, setCoursesData] = useState({ data: null });
  const [filteredCourses, setFilteredCourses] = useState();
  const [scienceName, setScienceName] = useState("");
  const [sciencesData, setSciencesData] = useState({ data: null });
  const [mainScienceId, setMainScienceId] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    try {
      getSciences().then((sciences) => {
        setSciencesData(sciences);
        setScienceName(sciences.data[mainScienceId].name);
        getCourses(sciences.data[mainScienceId].id).then((courses) => {
          setCoursesData(courses.data);
          setFilteredCourses(courses.data);
        });
      });
    } catch (e) {
      console.log(e);
      setError(e);
    }
    setIsLoading(false);
  }, [scienceName]);

  if (error) {
    return error.name;
  }
  return (
    <NavLayout mode="flex">
      {isLoading && <Typography>Poczekaj chwilę...</Typography>}
      {!isLoading && filteredCourses !== undefined && coursesData !== null && (
        <Grid container direction="row" justifyContent="space-between">
          <Grid xs={8}>
            <TextField
              sx={{ marginBottom: 5 }}
              id="outlined-search"
              label="Wyszukaj kurs"
              type="search"
              onChange={(event) => {
                setFilteredCourses(
                  coursesData.filter((course) =>
                    course.name
                      .toLocaleLowerCase()
                      .includes(event.target.value.toLowerCase())
                  )
                );
              }}
            />

            {filteredCourses
              .slice((page - 1) * 3, page * 3)
              .map((item, index) => (
                <Surface sx={{ marginBottom: 6 }} key={index}>
                  <Typography>{item.name}</Typography>
                  <Typography>{item.educator.type}</Typography>
                </Surface>
              ))}
            {filteredCourses.length > 3 ? (
              <Pagination
                count={Math.ceil(filteredCourses.length / 3)}
                onChange={(e, value) => setPage(value)}
              />
            ) : (
              <Typography color={theme.palette.surface.main[200]}>
                Nie ma więcej wyszukiwań...
              </Typography>
            )}
          </Grid>

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
                  if (sciencesData.data[mainScienceId - 1]) {
                    setScienceName(sciencesData.data[mainScienceId - 1].name);
                    setMainScienceId(mainScienceId - 1);
                  }
                }}
              >
                <ChevronLeft />
              </IconButton>
              <Typography fontSize="large">{scienceName}</Typography>
              <IconButton
                sx={{ color: "black" }}
                onClick={() => {
                  if (sciencesData.data[mainScienceId + 1]) {
                    setScienceName(sciencesData.data[mainScienceId + 1].name);
                    setMainScienceId(mainScienceId + 1);
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

            {
              //TAGS MISSING
            }
          </Grid>
        </Grid>
      )}
    </NavLayout>
  );
}
