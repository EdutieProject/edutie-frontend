import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './features/redux/store'
import { ThemeProvider,  } from "@mui/material";
import Home from "./pages/Home"
import theme  from "./theme/Theme";


export default function App() {
  return(
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home/>}/>
            </Routes>
          </BrowserRouter>
      </ThemeProvider>
    </ReduxProvider>
  )
}