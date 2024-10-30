//LAYOUT IMPORTS
import NavLayout from "./layout/NavLayout.js";
import Surface from "../components/global/Surface.js";
import {Box, Divider, Grid, IconButton, Pagination, Skeleton, TextField, Typography, useTheme} from "@mui/material";

//CODE IMPORTS
import React, {Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState} from "react";
import {getAccessibleSciences, getCoursesByScience} from "../services/studyProgramLearningService.js";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import LoadingView from "./common/LoadingView.js";
import Heading from "../components/global/Heading.js";
import {useNavigate} from "react-router-dom";
import {navigationPath, navSections} from "../features/navigation/navigationPath";
import ErrorView from "./common/ErrorView.js";
import RoundedButton from "../components/global/RoundedButton";
import SweatFaceIcon from "../components/customIcons/SweatFaceIcon";
import QuestionMarkIcon from "../components/customIcons/QuestionMarkIcon";

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
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: theme.spacing(10)
            }}>
                <IconButton
                    sx={{color: "black"}}
                    size={"large"}
                    onClick={() => {
                        if (sciences[selectedScienceIndex - 1]) {
                            setSelectedScienceIndex(selectedScienceIndex - 1);
                        }
                    }}>
                    <ChevronLeft fontSize={"large"}/>
                </IconButton>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: theme.spacing(2)
                }}>
                    <Heading variant="h3">{selectedScience.name}</Heading>
                    <img
                        src={
                            selectedScience.imageSource === null
                                ? "https://www.svgrepo.com/show/453302/mobius-strip.svg"
                                : selectedScience.imageSource
                        }
                        alt="Science Picture"
                        width={200}
                        style={{
                            aspectRatio: 1,
                            objectFit: "cover",
                            borderRadius: theme.shape.borderRadius /* Insert theme value bcs of no theme reference in img html tag*/
                        }}
                    />
                    <Typography color="grey" variant="overline">
                        {selectedScience.description}
                    </Typography>
                </Box>
                <IconButton
                    sx={{color: "black"}}
                    size={"large"}
                    onClick={() => {
                        if (sciences[selectedScienceIndex + 1]) {
                            setSelectedScienceIndex(selectedScienceIndex + 1);
                        }
                    }}>
                    <ChevronRight fontSize={"large"}/>
                </IconButton>
            </Box>
            <Divider flexItem/>
            <CourseList scienceId={selectedScience.id} setErrorInView={setError}/>
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

    if (loading) {
        return (<Skeleton height={"6rem"} animation={"wave"}/>);
    }

    return (
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <Box sx={{display: "grid", placeItems: "start"}}>
                <TextField
                    sx={{marginY: theme.spacing(4)}}
                    id="outlined-search"
                    label="Wyszukaj zestaw"
                    type="search"
                    onChange={(event) => {
                        console.log(event.target.value.toLowerCase());
                        setFilteredCourses(
                            allCourses.filter((course) => course.name.toLocaleLowerCase().includes(event.target.value.toLowerCase()))
                        );
                    }}
                />
            </Box>
            {filteredCourses.length > 0 ? filteredCourses.slice((page - 1) * 3, page * 3).map((course, index) => (
                    <CourseTile course={course} key={index}/>
                )) :
                <Box sx={{
                    flexGrow: 1,
                    display: "flex",
                    gap: theme.spacing(12),
                    justifyContent: "center",
                    alignItems: "center",
                    my: theme.spacing(4)
                }}>
                    <SweatFaceIcon width={"12rem"} height={"12rem"}/>
                    <Box>
                        <Heading variant="h6">Niczego nie znaleźliśmy</Heading>
                        <Typography>Nie mamy takich zestawów...</Typography>
                    </Box>
                </Box>
            }
            <Pagination count={Math.ceil(filteredCourses.length / 3)} onChange={(e, value) => setPage(value)}/>
        </Box>
    );
}

const CourseTile = ({course}: { course: any }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    return (
        <Surface sx={{my: theme.spacing(2), display: "flex"}}>
            <Grid container>
                <Grid item xs={12} md={2} sx={{display: "grid", placeItems: "center"}}>
                    <img
                        src={
                            course.imageSource === null
                                ? "https://www.svgrepo.com/show/452651/globe.svg"
                                : course.imageSource
                        }
                        width="100%"
                        style={{aspectRatio: 1, objectFit: "cover", borderRadius: theme.shape.borderRadius}}
                        alt={"Course"}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={{paddingLeft: theme.spacing(2), display: "flex"}}>
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
                                            borderRadius: 1,
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
                                alignItems: "flex-end"
                            }}>
                            <Box sx={{display: "grid", placeItems: "center"}}>
                                <Box sx={{display: "flex", flexDirection: "row", gap: theme.spacing(2), alignItems: "center"}}>
                                    <QuestionMarkIcon width={"4rem"} height={"4rem"}/> Autor nieznany
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
