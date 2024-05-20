import * as React from 'react';

// import Slider from "./Slider";
import TextField from '@mui/material/TextField';

import NavLayout from './layout/NavLayout';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import ScienceCarousel from '../components/slider/ScienceCarousel';
import Surface from '../components/Global/Surface';
import { useState } from 'react';
import { getAllSciences, getCourseById, getCoursesOfScience } from '../services/StudyProgramServices';
import { ChevronRight } from '@mui/icons-material';
import { useEffect } from 'react';


export default function LearnPage() {
    const theme = useTheme();
    const sciences = getAllSciences();
    const [selectedScience, setSelectedScience] = useState(sciences[0]);
    const [displayedCourses, setDisplayedCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    useEffect(()=>{
        setDisplayedCourses(getCoursesOfScience(selectedScience.id));
    },[selectedScience]);

    /** Render a course details view if one has been selected */
    if(selectedCourseId !== null) 
        return (<ViewCourse courseId={selectedCourseId}/>);

    /** Render usual view otherwise */
    return (
        <NavLayout>
            <Box sx={{padding: theme.spacing(2), display: "flex", justifyContent: "center"}}>
                <TextField label="Wyszukaj kursik"/>
            </Box>
            <Box>
                <ScienceCarousel sciences={sciences} setActiveScience={setSelectedScience}/>
                <Grid container spacing={2} marginTop={theme.spacing(4)}>
                {
                    displayedCourses.map(o => 
                    <Grid item xs={3} key={o.id}>
                        <CourseTile course={o} setActiveCourse={setSelectedCourseId}/>
                    </Grid>)
                }
                </Grid>
            </Box>
        </NavLayout>
    );
}

/**
 * Component used as tile to show the variety of courses
 */
function CourseTile({ course, setActiveCourse }) {
    return (
        <Surface sx={{display: "flex", gap: 2, flexDirection: "column"}}>
            <Typography variant='h6'>{ course.name }</Typography>
            <Typography variant='body1'>{ course.description }</Typography>
            <Button variant="contained" disableElevation endIcon={<ChevronRight/>} onClick={() => setActiveCourse(course.id)}>
                Zobacz
            </Button>
        </Surface>
    );
}

/**
 * Component rendered as a course preview.
 */
function ViewCourse({ courseId }) {

    const course = getCourseById(courseId);

    //TODO: Use flex to make the view responsive
    return (
        <NavLayout>
            <Grid container spacing={2} marginTop={4}>
                <Grid item xs={6} sx={{display: "flex", justifyContent: "center"}}>
                    <img src='https://www.dickleburgh.norfolk.sch.uk/wp-content/uploads/2020/02/science.jpg'></img>
                </Grid>
                <Grid item xs={6} sx={{display: "flex", flexDirection: "column", gap: 2}}>
                    <Typography variant='h1' fontFamily="Baloo">
                        {course.name}
                    </Typography>
                    <Typography variant='body1'>
                        {course.description}
                    </Typography>
                    <Button fullWidth variant='contained'>Przejdź do kursu</Button>
                </Grid>
            </Grid>
            
        </NavLayout>
    )
}   
