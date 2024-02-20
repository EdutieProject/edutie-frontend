import { useQuery, gql,ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import './App.css'
import LessonTreeGenerator from './components/LessonTreeGenerator';
import AccountPage from './components/Account/AccountPage';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LessonTrees from './components/Lessons/LessonsTrees';
import SignIn from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import DevelopmentViewList from "./views/DevelopmentViewList";

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
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/account" element={<AccountPage />}/>
        <Route path="/trees" element={<LessonTrees/>}/>
        <Route path="/lesson" element={ <LessonTreeGenerator/>} />
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/dev" element={<DevelopmentViewList/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
