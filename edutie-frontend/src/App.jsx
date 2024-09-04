import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./features/redux/store";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/Theme";

import HomeView from "./views/HomeView";
import AccountView from "./views/AccountView";
import { navigationPath } from "./features/navigation";
import SegmentTreeView from "./views/SegmentTreeView";
import LessonTreeView from "./views/LessonTreeView";
import CoursesView from "./views/CoursesView";
import LearningResourceView from "./views/LearningResourceView";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path={navigationPath.home} element={<HomeView />} />
            <Route path={navigationPath.lessonTree} element={<LessonTreeView />} />
            <Route path={navigationPath.segmentTree} element={<SegmentTreeView />} />
            <Route path={navigationPath.exercise} element={<LearningResourceView />} />
            <Route path={navigationPath.account} element={<AccountView />} />
            <Route path={navigationPath.courses} element={<CoursesView />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ReduxProvider>
  );
}
