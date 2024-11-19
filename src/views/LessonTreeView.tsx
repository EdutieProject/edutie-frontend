import {Box, ButtonBase, Divider, Grid, Typography, useTheme} from "@mui/material";
import NavLayout from "./layout/NavLayout.js";
import React, {useEffect, useState} from "react";
import {getCourseDetailsById, getLessonsByCourse} from "../services/studyProgramLearningService.js";
import Xarrow from "react-xarrows";
import LoadingView from "./common/LoadingView.js";
import {useNavigate, useParams} from "react-router-dom";
import {navigationPath, navSections} from "../features/navigation/navigationPath";
import ErrorView from "./common/ErrorView.js";
import {clearSavedCourseId, saveCourseId} from "../features/storage/courseStorage.js";
import Heading from "../components/global/Heading.js";
import RoundedButton from "../components/global/RoundedButton";
import ReturnDoodleIcon from "../components/customIcons/ReturnDoodleIcon";

class TreeGridInitializer {
    static getFirstLevel(data: Array<any>): Array<any> {
        return [data.find((o: any) => o.lesson.previousElement === null)];
    }

    static getNextLevel(prevLevel: Array<any>, allNodes: Array<any>): Array<any> {
        return prevLevel.flatMap(o => o.lesson.nextElements).map((o) => allNodes.find(x => x.lesson.id === o.id));
    }

    static getTreeAsArray(data: Array<any>): Array<Array<any>> {
        let arr = [this.getFirstLevel(data)];
        let lastElemIdx = 0;
        while (arr[lastElemIdx].length !== 0) {
            lastElemIdx = arr.length - 1;
            let nextLevel = this.getNextLevel(arr[lastElemIdx], data);
            arr.push(nextLevel);
        }
        return arr;
    }
}

export default function LessonTreeView() {
    const theme = useTheme();
    const navigate = useNavigate();
    /** Course Id may be injected from storage in the navigation */
    const {courseId} = useParams();
    const [lessonsResponse, setLessonsResponse] = useState({data: null, error: null, success: false});
    const [courseDetailsResponse, setCourseDetailsResponse] = useState({data: null, error: null, success: false});
    const [error, setError] = useState<any>(null);
    const [initialLoading, setInitialLoading] = useState(true);

    async function initialLoad() {
        const lessonsResponse = await getLessonsByCourse(courseId as string);
        if (!lessonsResponse.success) {
            console.log(lessonsResponse);
            setError(lessonsResponse.error);
            return;
        }
        setLessonsResponse(lessonsResponse);
        saveCourseId(courseId as string);
        const courseDetailsResponse = await getCourseDetailsById(courseId as string);
        if (!courseDetailsResponse.success) {
            setError(courseDetailsResponse.error);
            return;
        }
        setCourseDetailsResponse(courseDetailsResponse);
        setInitialLoading(false);
    }

    const coursesViewComeback = () => {
        clearSavedCourseId();
        navigate(navigationPath.courses);
    }

    useEffect(() => {
        initialLoad().finally();
    }, []);

    if (error)
        return <ErrorView error={error}/>

    if (initialLoading)
        return (<LoadingView/>);

    let treeLevelsArray = TreeGridInitializer.getTreeAsArray(lessonsResponse.data as unknown as Array<any>);
    return (
        <NavLayout disablePadding activeSectionIdOverride={navSections.courses}>
            <Box sx={{py: theme.spacing(4), px: theme.spacing(8), display: "flex", alignItems: "center", justifyItems: "space-between"}}>
                <Box sx={{width: "100%"}}>
                    <Heading variant="h3">{(courseDetailsResponse.data as unknown as any).name}</Heading>
                    <Typography
                        variant="body1">{(courseDetailsResponse.data as unknown as any).description}</Typography>
                </Box>
                <RoundedButton label={"Wróć do zestawów"}
                               sx={{
                                   backgroundColor: theme.palette.accentFirst.main,
                                   "&:hover": {backgroundColor: theme.palette.accentFirst.light}
                               }}
                               leftIcon={<ReturnDoodleIcon width={"2rem"} height={"2rem"}/>}
                               onClick={coursesViewComeback}
                />
            </Box>
            <Divider variant={"middle"}/>
            <Grid container>
                {
                    treeLevelsArray.map((treeLevel) =>
                        treeLevel.map(lessonView =>
                            <Grid item sm={12 / treeLevel.length}>
                                <Box sx={{paddingY: theme.spacing(8), display: "grid", placeItems: "center"}}>
                                    <LessonViewTile lessonView={lessonView}/>
                                </Box>
                            </Grid>
                        )
                    )
                }
            </Grid>
        </NavLayout>
    );
}

function LessonViewTile({lessonView}: { lessonView: any }) {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: theme.spacing(2), alignItems: "center"}}>
            <ButtonBase sx={{
                borderRadius: theme.shape.borderRadius,
                border: "3px solid",
                borderColor: lessonView.progressState === "IN_PROGRESS" ? theme.palette.secondary.main : theme.palette.primary.main,
                backgroundColor: lessonView.progressState === "DONE" ? theme.palette.primary.main : theme.palette.grey["200"],
                padding: theme.spacing(4),
                position: "relative",
                transition: "200ms ease",
                "&:hover": {
                    borderColor: lessonView.progressState === "IN_PROGRESS" ? theme.palette.secondary.main : theme.palette.primary.light,
                    boxShadow: theme.shadows[2]
                },
            }}
                        onClick={() => navigate(navigationPath.fillPath(navigationPath.segmentTree, lessonView.lesson.id))}
            >
                <Box id={lessonView.lesson.id} sx={{
                    position: "absolute",
                    top: 0, left: 0,
                    height: "100%", width: "100%",
                    display: "grid",
                    placeItems: "center",
                    zIndex: 1,
                    transition: "200ms ease",
                    "&:hover": {
                        transform: "scale(1.08)"
                    }
                }}>
                    {lessonView.progressState === "NONE" ?
                        <Typography variant="h3" color={theme.palette.primary.main} fontFamily={"Baloo"}
                                    sx={{userSelect: "none"}}>?</Typography>
                        : lessonView.progressState === "IN_PROGRESS" ?
                            <Typography variant="h3" color={theme.palette.secondary.main} fontFamily={"Baloo"}
                                        sx={{userSelect: "none"}}>!</Typography>
                            :
                            <Typography variant="h3" color={theme.palette.common.white} fontFamily={"Baloo"}
                                        sx={{userSelect: "none"}}>x</Typography>

                    }

                </Box>
                {
                    lessonView.lesson.previousElement != null ?
                        <Xarrow start={lessonView.lesson.id} end={lessonView.lesson.previousElement.id}
                                curveness={0.2} color={theme.palette.grey[200]} showHead={false} showTail={false}
                                zIndex={-1}/>
                        : <></>
                }
            </ButtonBase>
            <Typography variant="h5" fontFamily={"Baloo"} zIndex={1}>{lessonView.lesson.name}</Typography>
        </Box>
    )
}