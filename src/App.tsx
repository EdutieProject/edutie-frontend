import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/Theme";

import { SelectedNavigationSectionProvider } from "./features/navigation/navigationState";

import HomeView from "./views/HomeView";
import SegmentTreeView from "./views/SegmentTreeView";
import LessonTreeView from "./views/LessonTreeView";
import CoursesView from "./views/CoursesView";
import LRDCreationView from "./views/LRDCreationView";
import LearningResourceView from "./views/LearningResourceView";
import LearningResultView from "./views/LearningResultView";
import PlaygroundView from "./views/PlaygroundView";
import ProfileView from "./views/ProfileView";
import { navigationPath } from "./features/navigation/navigationPath";
import React, { useEffect, useState } from "react";
import MobileView from "./views/MobileView";

export default function App() {
  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 1000;

  if (isMobile) {
    return (
      <ThemeProvider theme={theme}>
        <MobileView />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <SelectedNavigationSectionProvider>
        <BrowserRouter>
          <Routes>
            <Route path={navigationPath.home} element={<HomeView />} />
            <Route path={navigationPath.lessonTree} element={<LessonTreeView />} />
            <Route path={navigationPath.segmentTree} element={<SegmentTreeView />} />
            <Route path={navigationPath.exercise} element={<LearningResourceView />} />
            <Route path={navigationPath.account} element={<ProfileView />} />
            <Route path={navigationPath.courses} element={<CoursesView />} />
            <Route path={navigationPath.learningResult} element={<LearningResultView />} />
            <Route path={navigationPath.creation} element={<LRDCreationView />} />
            <Route path={navigationPath.play} element={<PlaygroundView />} />
          </Routes>
        </BrowserRouter>
      </SelectedNavigationSectionProvider>
    </ThemeProvider>
  );
}
