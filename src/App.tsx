import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import theme from "src/theme/Theme";

import {SelectedNavigationSectionProvider} from "src/features/navigation/navigationState";
import {navigationPath} from "src/features/navigation/navigationPath";
import {SessionProvider} from "src/features/session/SessionProvider";
import {mobileCheck} from "src/features/mobileDetection";

import HomeView from "src/views/HomeView";
import SegmentTreeView from "src/views/SegmentTreeView";
import LessonTreeView from "src/views/LessonTreeView";
import CoursesView from "src/views/CoursesView";
import LRDCreationView from "src/views/LRDCreationView";
import LearningResourceView from "src/views/LearningResourceView";
import LearningResultView from "src/views/LearningResultView";
import ProfileView from "src/views/ProfileView";
import MobileView from "src/views/MobileView";

export default function App() {
    const isMobile = mobileCheck();

    if (isMobile) {
        return (
            <ThemeProvider theme={theme}>
                <MobileView/>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <SessionProvider>
                <SelectedNavigationSectionProvider>
                    <BrowserRouter basename={import.meta.env.BASE_URL}>
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
