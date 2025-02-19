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
import MobileView from "./views/MobileView";
import {SessionProvider} from "./features/session/SessionProvider";
import {mobileCheck} from "./features/mobileDetection";
import {ErrorBoundary} from "react-error-boundary";
import ErrorView from "./views/common/ErrorView";

export default function App() {
    const isMobile = mobileCheck();

    function fallbackRender({error, resetErrorBoundary}: { error: any, resetErrorBoundary: ErrorBoundary }) {
        console.log(error);
        return <ErrorView error={error}/>;
    }

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
                        <ErrorBoundary fallbackRender={fallbackRender}>
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
                        </ErrorBoundary>
                    </BrowserRouter>
                </SelectedNavigationSectionProvider>
            </SessionProvider>
        </ThemeProvider>
    );
}
