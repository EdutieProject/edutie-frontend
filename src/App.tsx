import React from "react";
import {ThemeProvider} from "@mui/material";
import theme from "src/theme/Theme";

import {SelectedNavigationSectionProvider} from "src/features/navigation/navigationState";
import {navigationPath} from "src/features/navigation/navigationPath";
import {SessionProvider} from "src/features/session/SessionProvider";

import {BrowserRouter, Route, Routes} from "react-router";
import HomeView from "src/views/home";
import CreateView from "src/views/create";

export default function App() {

    return (
        <ThemeProvider theme={theme}>
            <SessionProvider>
                <SelectedNavigationSectionProvider>
                    <BrowserRouter basename={import.meta.env.BASE_URL}>
                        <Routes>
                            <Route path={navigationPath.home} element={<HomeView/>}/>
                            <Route path={navigationPath.create} element={<CreateView/>}/>
                        </Routes>
                    </BrowserRouter>
                </SelectedNavigationSectionProvider>
            </SessionProvider>
        </ThemeProvider>
    );
}
