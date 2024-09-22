import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/Theme";

import { navigationPath, SelectedNavigationSectionProvider } from "./features/navigation";

import HomeView from "./views/HomeView";
import SegmentTreeView from "./views/SegmentTreeView";
import LessonTreeView from "./views/LessonTreeView";
import CoursesView from "./views/CoursesView";
import LearningResourceView from "./views/LearningResourceView";
import LearningResultView from "./views/LearningResultView";
import ProfileView from "./views/ProfileView";

export default function App() {
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
          </Routes>
        </BrowserRouter>
      </SelectedNavigationSectionProvider>
    </ThemeProvider>
  );
}
