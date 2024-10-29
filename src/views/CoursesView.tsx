//LAYOUT IMPORTS
import NavLayout from "./layout/NavLayout.js";
import Surface from "../components/global/Surface.js";
import {Box, Grid, IconButton, Pagination, Skeleton, TextField, Typography, useTheme} from "@mui/material";

//CODE IMPORTS
import React, {Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState} from "react";
import {getAccessibleSciences, getCoursesByScience} from "../services/studyProgramLearningService.js";
import {ChevronLeft, ChevronRight, QuestionMark} from "@mui/icons-material";
import LoadingView from "./common/LoadingView.js";
import Heading from "../components/global/Heading.js";
import {useNavigate} from "react-router-dom";
import {navigationPath, navSections} from "../features/navigation/navigationPath";
import ErrorView from "./common/ErrorView.js";
import RoundedButton from "../components/global/RoundedButton";

export default function CoursesView() {
    const theme = useTheme();
    const [error, setError] = useState();
    let sciencesData: MutableRefObject<Array<any>> = useRef([]);
    const [selectedScienceIndex, setSelectedScienceIndex] = useState(0);
    const [initialLoading, setInitialLoading] = useState(true);

    /** A state broker is here - transferring state between CourseList and higher-level view component  */
    const [selectedTags, setSelectedTags] = useState([]);

    async function initialLoad() {
        const sciencesResponse = await getAccessibleSciences();
        if (!sciencesResponse.success) {
            setError(sciencesResponse.error);
            return;
        }
        sciencesData.current = sciencesResponse.data;
        setInitialLoading(false);
    }

    useEffect(() => {
        initialLoad();
    }, []);

    if (error) {
        return <ErrorView error={error}/>;
    }

    if (initialLoading) {
        return <LoadingView/>;
    }

    let sciences = sciencesData.current;
    let selectedScience = sciences[selectedScienceIndex];
    return (
        <NavLayout mode="flex" activeSectionIdOverride={navSections.courses} scroll>
            <Grid container direction="row" justifyContent="space-between" gap={theme.spacing(14)}
                  flexWrap="wrap-reverse">
                <CourseList scienceId={selectedScience.id} setErrorInView={setError}/>
                <Grid sx={{flexGrow: 1}}>
                    <Grid item container direction="row" justifyContent="space-around" alignItems="center"
                          marginBottom="20px">
                        <IconButton
                            sx={{color: "black"}}
                            onClick={() => {
                                if (sciences[selectedScienceIndex - 1]) {
                                    setSelectedScienceIndex(selectedScienceIndex - 1);
                                }
                            }}>
                            <ChevronLeft/>
                        </IconButton>
                        <Heading variant="h5">{selectedScience.name}</Heading>
                        <IconButton
                            sx={{color: "black"}}
                            onClick={() => {
                                if (sciences[selectedScienceIndex + 1]) {
                                    setSelectedScienceIndex(selectedScienceIndex + 1);
                                }
                            }}>
                            <ChevronRight/>
                        </IconButton>
                    </Grid>
                    <Box sx={{display: "grid", placeItems: "center"}}>
                        <img
                            src={
                                selectedScience.imageSource === null
                                    ? "https://as2.ftcdn.net/v2/jpg/05/79/64/29/1000_F_579642932_z3CUhYjjYWcGIWJtO30pMyYVFpDyoa1W.jpg"
                                    : selectedScience.imageSource
                            }
                            alt="Science Picture"
                            width={250}
                            style={{aspectRatio: 1, objectFit: "cover", borderRadius: theme.shape.borderRadius}}
                        />
                    </Box>
                    <Box sx={{width: "100%", my: theme.spacing(4), textAlign: "center"}}>
                        <Typography color="grey" variant="overline">
                            {selectedScience.description}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </NavLayout>
    );
}

function CourseList({
                        scienceId,
                        setErrorInView,
                    }: {
    scienceId: string;
    setErrorInView: Dispatch<SetStateAction<any>>;
}) {
    const theme = useTheme();
    const [allCourses, setAllCourses] = useState<Array<any>>([]);
    const [filteredCourses, setFilteredCourses] = useState<Array<any>>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCoursesByScience(scienceId).then((coursesResponse) => {
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

    const skeletonCourseTileSize = "16rem";

    if (loading) {
        return (
            <Grid xs={8}>
                <TextField
                    sx={{marginBottom: theme.spacing(1)}}
                    id="outlined-search"
                    label="Wyszukaj kurs"
                    type="search"
                    onChange={(event) => {
                        console.log(event.target.value.toLowerCase());
                        setFilteredCourses(
                            allCourses.filter((course) => course.name.toLocaleLowerCase().includes(event.target.value.toLowerCase()))
                        );
                    }}
                    disabled
                />
                <Skeleton animation="wave" height={skeletonCourseTileSize}/>
                <Skeleton animation="wave" height={skeletonCourseTileSize}/>
                <Skeleton animation="wave" height={skeletonCourseTileSize}/>
            </Grid>
        );
    }

    return (
        <Grid xs={8}>
            <TextField
                sx={{marginBottom: theme.spacing(2)}}
                id="outlined-search"
                label="Wyszukaj kurs"
                type="search"
                onChange={(event) => {
                    console.log(event.target.value.toLowerCase());
                    setFilteredCourses(
                        allCourses.filter((course) => course.name.toLocaleLowerCase().includes(event.target.value.toLowerCase()))
                    );
                }}
            />
            {filteredCourses.slice((page - 1) * 3, page * 3).map((course, index) => (
                <CourseTile course={course} key={index}/>
            ))}
            <Pagination count={Math.ceil(filteredCourses.length / 3)} onChange={(e, value) => setPage(value)}/>
        </Grid>
    );
}

const CourseTile = ({course}: { course: any }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <Surface sx={{my: theme.spacing(3), display: "flex"}}>
            <Grid container>
                <Grid item xs={12} md={2} sx={{display: "grid", placeItems: "center", paddingX: theme.spacing(1)}}>
                    <img
                        src={
                            course.imageSource === null
                                ? "https://thumbs.dreamstime.com/b/trigonometry-formula-line-icon-vector-illustration-sign-isolated-contour-symbol-black-331770196.jpg"
                                : course.imageSource
                        }
                        width="100%"
                        style={{aspectRatio: 1, objectFit: "cover", borderRadius: theme.shape.borderRadius}}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={{paddingX: theme.spacing(1), display: "flex"}}>
                    <Box sx={{flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                flexWrap: "wrap-reverse",
                            }}>
                            <Heading variant={"h4"}>{course.name}</Heading>
                            <Box sx={{display: "flex", flexDirection: "row", gap: theme.spacing(2)}}>
                                {course.courseTags.map((tag: any) => (
                                    <Box
                                        sx={{
                                            color: theme.palette.getContrastText(theme.palette.secondary.light),
                                            borderRadius: theme.shape.borderRadius,
                                            backgroundColor: theme.palette.secondary.light,
                                            px: theme.spacing(2),
                                            py: theme.spacing(1),
                                            display: "grid",
                                            placeItems: "center",
                                        }}>
                                        {tag.name}
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                        <Typography variant="body1">{course.description}</Typography>
                        <Box
                            sx={{
                                mt: theme.spacing(1),
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}>
                            <Box sx={{display: "grid", placeItems: "center"}}>
                                <Box sx={{display: "flex", flexDirection: "row", gap: theme.spacing(2)}}>
                                    <QuestionMark htmlColor={theme.palette.common.black}/> Autor nieznany
                                </Box>
                            </Box>
                            <RoundedButton
                                label={"Wejdź"} active
                                onClick={() => navigate(navigationPath.fillPath(navigationPath.lessonTree, course.id))}/>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Surface>
    );
};
