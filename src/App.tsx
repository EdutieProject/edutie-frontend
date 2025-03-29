import React from "react";
import {ThemeProvider} from "@mui/material";
import theme from "src/theme/Theme";

import {SelectedNavigationSectionProvider} from "src/features/navigation/navigationState";
import {navigationPath} from "src/features/navigation/navigationPath";
import {SessionProvider} from "src/features/session/SessionProvider";

import {BrowserRouter, Route, Routes} from "react-router";
import HomeView from "src/views/learn";
import CreateView from "src/views/create";
import LearningSubjectEditorView from "src/views/create/learningsubject";
import LearningSubjectLearnView from "src/views/learn/learningsubject";
import LearningExperienceView from "src/views/learn/learningexperience";
import LearningResultView from "src/views/learn/learningresult";

export default function App() {

    return (
        <ThemeProvider theme={theme}>
            <SessionProvider>
                <SelectedNavigationSectionProvider>
                    <BrowserRouter basename={import.meta.env.BASE_URL}>
                        <Routes>
                            <Route path={navigationPath.home} element={<HomeView/>}/>
                            <Route path={navigationPath.create} element={<CreateView/>}/>
                            <Route path={navigationPath.learningSubjectEditor} element={<LearningSubjectEditorView/>}/>
                            <Route path={navigationPath.learningSubjectLearn} element={<LearningSubjectLearnView/>}/>
                            <Route path={navigationPath.learningExperience} element={<LearningExperienceView/>}/>
                            <Route path={navigationPath.learningResult} element={<LearningResultView/>}/>
                        </Routes>
                    </BrowserRouter>
                </SelectedNavigationSectionProvider>
            </SessionProvider>
        </ThemeProvider>
    );
}
