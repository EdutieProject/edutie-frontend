import { Button, Typography } from "@mui/material";
import NavLayout from "./layout/NavLayout";
import { getCourses } from "../services/studyProgramLearningService";

export default function PlaygroundView() {
    return (
        <NavLayout>
            <Typography>Hello World! This view is currently occupied for API testing purposes</Typography>
            <Button onClick={()=>getCourses("db48e4f2-e385-4bf4-9e77-9e6939472529").then(o=>console.log(o))}>Fetch</Button>
        </NavLayout>
    )
}