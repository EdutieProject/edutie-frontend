import { Button, Typography } from "@mui/material";
import NavLayout from "./layout/NavLayout";
import { getCourses, getLessons, getSciences, getSegments } from "../services/studyProgramLearningService";

export default function PlaygroundView() {
    return (
        <NavLayout>
            <Typography>Hello World! This view is currently occupied for API testing purposes</Typography>
            <Button onClick={()=>getSciences().then(o=>console.log(o))}>Tutaj zaloguj do konsoli dziedziny - matematyka etc.</Button>
            <Button onClick={
                ()=>getSciences()
                .then(sciences=>getCourses(sciences.data[0].id)
                .then(courses=>getLessons(courses.data[0].id)
                .then(lessons=>getSegments(lessons.data[0].lesson.id)
                .then(segments => console.log(segments)))))
                }>Tutaj zaloguj do konsoli segmenty - payload dla drzewek segmentów</Button>
        </NavLayout>
    )
}