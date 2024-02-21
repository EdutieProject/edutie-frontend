import { Box, Button, Container, Fab, Typography } from "@mui/material";
import HomeView from "./HomeView";
import TaskView from "./TaskView";
import ScienceView from "./ScienceView";
import LearningTreeView from "./LearningTreeView";
import { useState } from "react";

export default function DevelopmentViewList(props) {

    const [currentView, setCurrentView] = useState(null);

    const views = [
        {
            name: "Home View",
            element: <HomeView/>
        },
        {
            name: "Task View + Segment ?",
            element: <TaskView/>
        },
        {
            name: "Science View",
            element: <ScienceView/>
        },
        {
            name: "Learning Tree View",
            element: <LearningTreeView/>
        }
    ];

    if (currentView != null) 
        return (
        <>
            {currentView}
            <Fab style={{position: "absolute", bottom: 16}} onClick={()=>setCurrentView(null)}>
                <Typography>Wróć</Typography>
            </Fab>
        </>
            );

    return (<Container>
        <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
            {views.map(v=><Button variant="outlined" onClick={()=>setCurrentView(v.element)}>{v.name}</Button>)}
        </Box>
    </Container>)
}