import { useQuery, gql,ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Main from "./pages/Main";
import './App.css'
import LessonTreeGenerator from './components/LessonTreeGenerator';
import AccountPage from './components/Account/AccountPage';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LessonTrees
from './components/Lessons/LessonsTrees';
import SignIn from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import { Provider } from 'react-redux'
import { store } from './features/store'
import { ThemeProvider,  } from "@mui/material";
import { createMuiTheme } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { lime, purple, red } from "@mui/material/colors";
import theme  from "./theme/Theme";
import Settings from "./components/Settings/Settings";

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
            <Route path="/" element={<Main page={<Home/>}/>}/>
            <Route path="/account" element={<Main page={<AccountPage/>}/>}/>
            <Route path="/trees" element={<Main page={<LessonTrees/>}/>}/>
            <Route path="/lesson" element={ <LessonTreeGenerator/>} />
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/settings" element={<Main page={<Settings/>}/>} />
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
    </Provider>
  )
}

export default App
