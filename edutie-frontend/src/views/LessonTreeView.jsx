import { Box, ButtonBase, Grid, Typography, useTheme } from "@mui/material";
import NavLayout from "./layout/NavLayout";
import { useEffect, useState } from "react";
import { getLessons } from "../services/studyProgramLearningService";
import Xarrow from "react-xarrows";
import LoadingView from "./common/LoadingView";
import { useNavigate, useParams } from "react-router-dom";
import { navigationPath, navSections } from "../features/navigation";
import ErrorView from "./common/ErrorView";
import NoContextView from "./common/NoContextView";
import { noSavedCourseIdPlaceholder, saveCourseId } from "../features/storage/courseStorage";
import Heading from "../components/global/Heading";

class TreeGridInitializer {
    static getFirstLevel(data) {
        return [data.find(o => o.lesson.previousElement === null)];
    }

    static getNextLevel(prevLevel, allNodes) {
        return prevLevel.flatMap(o => o.lesson.nextElements).map(o => allNodes.find(x => x.lesson.id === o.id));
    }

    static getTreeAsArray(data) {
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
    /** Course Id may be injected from storage in the navigation */
    const { courseId } = useParams();
    const [lessonsResponse, setLessonsResponse] = useState({ data: null, error: null });

    if (courseId === noSavedCourseIdPlaceholder)
        return (<NoContextView>
            Aby tu wejść musisz najpierw wybrać kurs. Zrób to wchodząc w zakładkę kursów i wybierając jeden z nich!
        </NoContextView>);

    useEffect(() => {
        getLessons(courseId).then(lessons => setLessonsResponse(lessons));
        saveCourseId(courseId);
    }, []);

    if (lessonsResponse.error !== null)
        return <ErrorView error={lessonsResponse.error} />

    if (lessonsResponse.data === null)
        return (<LoadingView />);

    let treeLevelsArray = TreeGridInitializer.getTreeAsArray(lessonsResponse.data);
    return (
        <NavLayout mode={"flex"} disablePadding activeSectionIdOverride={navSections.learningInTree}>
            <Box sx={{ width: "100%", textAlign: "center", py: theme.spacing(2) }}>
                <Heading variant="h4">Course</Heading>
                <Typography variant="caption">Course description</Typography>
            </Box>
            <Grid container sx={{ overflowY: "scroll" }}>
                {
                    treeLevelsArray.map((treeLevel) =>
                        treeLevel.map(lessonView =>
                            <Grid item sm={12 / treeLevel.length}>
                                <Box sx={{ paddingY: theme.spacing(8), display: "grid", placeItems: "center" }}>
                                    <LessonViewTile lessonView={lessonView} />
                                </Box>
                            </Grid>
                        )
                    )
                }
            </Grid>
        </NavLayout>
    );
}

function LessonViewTile({ lessonView }) {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: theme.spacing(2), alignItems: "center" }}>
            <ButtonBase sx={{
                borderRadius: theme.shape.minimalRadius,
                border: "3px solid",
                borderColor: theme.palette.primary.main,
                backgroundColor: lessonView.done ? theme.palette.primary.light : theme.palette.surface.main,
                padding: theme.spacing(4),
                position: "relative",
                transition: "200ms ease",
                "&:hover": {
                    borderColor: theme.palette.primary.light,
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
                    {lessonView.done ?
                        <Typography variant="h3" color={theme.palette.common.white} fontFamily={"Baloo"} sx={{ userSelect: "none" }}>x</Typography>
                        : <Typography variant="h3" color={theme.palette.primary.main} fontFamily={"Baloo"} sx={{ userSelect: "none" }}>?</Typography>}

                </Box>
                {
                    lessonView.lesson.previousElement != null ?
                        <Xarrow start={lessonView.lesson.id} end={lessonView.lesson.previousElement.id}
                            curveness={0.2} color={theme.palette.grey[200]} showHead={false} showTail={false} zIndex={-1} />
                        : <></>
                }
            </ButtonBase>
            <Typography variant="h5" fontFamily={"Baloo"} zIndex={1}>{lessonView.lesson.name}</Typography>
        </Box>
    )
}