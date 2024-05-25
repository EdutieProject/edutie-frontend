import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./features/redux/store";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/Theme";

import HomeView from "./views/HomeView";
import LearnView from "./views/LearnView";
import PlaygroundView from "./views/PlaygroundView";
import AccountView from "./views/AccountView";
import TreeSegView from "./views/TreeSegView";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/learn" element={<LearnView />} />
            <Route path="/playground" element={<PlaygroundView />} />
            <Route path="/account" element={<AccountView />} />
            <Route path="/tree" element={<TreeSegView />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ReduxProvider>
  );
}
