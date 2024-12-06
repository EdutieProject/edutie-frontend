import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import theme from "./theme/Theme";

import {SelectedNavigationSectionProvider} from "./features/navigation/navigationState";

import HomeView from "./views/HomeView";
import SegmentTreeView from "./views/SegmentTreeView";
import LessonTreeView from "./views/LessonTreeView";
import CoursesView from "./views/CoursesView";
import LRDCreationView from "./views/LRDCreationView";
import LearningResourceView from "./views/LearningResourceView";
import LearningResultView from "./views/LearningResultView";
import ProfileView from "./views/ProfileView";
import {navigationPath} from "./features/navigation/navigationPath";
import React from "react";
import {SessionProvider} from "./features/session/SessionProvider";

export default function App() {

    return (
        <ThemeProvider theme={theme}>
            <SessionProvider>
                <SelectedNavigationSectionProvider>
                    <BrowserRouter basename={import.meta.env.VITE_BASE_PATH_OVERRIDE}>
                        <Routes>
                            <Route path={navigationPath.home} element={<HomeView/>}/>
                            <Route path={navigationPath.lessonTree} element={<LessonTreeView/>}/>
                            <Route path={navigationPath.segmentTree} element={<SegmentTreeView/>}/>
                            <Route path={navigationPath.exercise} element={<LearningResourceView/>}/>
                            <Route path={navigationPath.account} element={<ProfileView/>}/>
                            <Route path={navigationPath.courses} element={<CoursesView/>}/>
                            <Route path={navigationPath.learningResult} element={<LearningResultView/>}/>
                            <Route path={navigationPath.creation} element={<LRDCreationView/>}/>
                        </Routes>
                    </BrowserRouter>
                </SelectedNavigationSectionProvider>
            </SessionProvider>
        </ThemeProvider>
    );
}
