import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './features/redux/store'
import { ThemeProvider,  } from "@mui/material";
import HomePage from "./pages/HomePage"
import theme  from "./theme/Theme";

import LearnPage from "./pages/LearnPage";
import SamplePage from "./pages/SamplePage";

export default function App() {
  return(
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/learn" element={<LearnPage/>} />
              <Route path="/sample" element={<SamplePage/>} />
            </Routes>
          </BrowserRouter>
      </ThemeProvider>
    </ReduxProvider>
  )
}