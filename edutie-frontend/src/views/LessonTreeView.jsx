import { Box, Grid, Typography, useTheme } from "@mui/material";
import NavLayout from "./layout/NavLayout";
import { useEffect, useState } from "react";
import { getCourses, getLessons, getSciences } from "../services/studyProgramLearningService";

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
    const [lessonsResponse, setLessonsResponse] = useState({ data: null });

    useEffect(() => {
        getSciences()
        .then(sciences => getCourses(sciences.data[0].id)
            .then(courses => getLessons(courses.data[0].id)
                .then(lessons => setLessonsResponse(lessons))));
    }, []);

    if (lessonsResponse.data === null)
        return (
            <NavLayout>
                <Typography>Loading...</Typography>
            </NavLayout>
        );

    let treeLevelsArray = TreeGridInitializer.getTreeAsArray(lessonsResponse.data);
    return (
        <NavLayout mode={"flex"}>
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
    )
}

function LessonViewTile({ lessonView }) {
    const theme = useTheme();

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: theme.spacing(2), alignItems: "center" }}>
            <Box id={lessonView.lesson.id} sx={{
                borderRadius: 5,
                border: "3px solid",
                borderColor: theme.palette.primary.main,
                backgroundColor: lessonView.done ? theme.palette.primary.light : theme.palette.surface.main,
                padding: theme.spacing(4),
                position: "relative"
            }}>
                <Box sx={{ position: "absolute", top: 0, left: 0, height: "100%", width: "100%", display: "grid", placeItems: "center" }}>
                    {lessonView.done ?
                        <Typography variant="h3" color={theme.palette.common.white} fontFamily={"Baloo"} sx={{ userSelect: "none" }}>x</Typography>
                        : <Typography variant="h3" color={theme.palette.primary.main} fontFamily={"Baloo"} sx={{ userSelect: "none" }}>?</Typography>}

                </Box>
            </Box>
            <Typography variant="h5" fontFamily={"Baloo"}>{lessonView.lesson.name}</Typography>
        </Box>
    )
}