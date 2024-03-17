import { gql } from "@apollo/client";
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from './features/store'
import { ThemeProvider,  } from "@mui/material";
import Home from "./pages/Home"
import theme  from "./theme/Theme";


// ##########################
// Path below is imported for future change from 'createMuiTheme' to 'createTheme'
// import Geo from "./assets/fonts/Geologica/geologica.ttf"
// #########################

const GetQuery = gql`
  query GetQuery {
    lessons {
      id
      name
      next
      active
      previous
    }
}`;

function App() {

  // const { data, loading, error } = useQuery(GetQuery);

  // if (loading) return "Loading...";
  // if (error) return <pre>{error.message}</pre>
  
  return(
    // ####################################
    // Provider is for Redux-store provider
    // ThemeProvider is for Global MUI Styles
    // ####################################
    <Provider store={store}>
    <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
    </Provider>
  )
}

export default App
