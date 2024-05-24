import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./features/redux/store";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/Theme";

import HomeView from "./views/HomeView";
import LearnView from "./views/LearnView";
import PlaygroundView from "./views/PlaygroundView";
import AccountView from "./views/AccountView";
import { navigationPaths } from "./config/navigation";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path={navigationPaths.home} element={<HomeView />} />
            <Route path={navigationPaths.courses} element={<LearnView />} />
            <Route path={navigationPaths.account} element={<AccountView/>} />
            <Route path="/playground" element={<PlaygroundView />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ReduxProvider>
  );
}
