import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./features/redux/store";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/Theme";

import HomeView from "./views/HomeView";
import CoursesView from "./views/CoursesView";
import PlaygroundView from "./views/PlaygroundView";
import AccountView from "./views/AccountView";
import { navigationPath } from "./config/navigation";
import TreeSegView from "./views/TreeSegView";
import ExcerciseView from "./views/ExerciseView";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path={navigationPath.home} element={<HomeView />} />
            <Route path={navigationPath.courses} element={<LearnView />} />
            <Route path={navigationPath.exercise} element={<ExcerciseView />} />
            <Route path={navigationPath.account} element={<AccountView />} />
            <Route path={navigationPath.segment} element={<PlaygroundView />} />
            <Route path="/playground" element={<PlaygroundView />} />
            <Route path="/account" element={<AccountView />} />
            <Route path="/tree" element={<TreeSegView />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ReduxProvider>
  );
}
