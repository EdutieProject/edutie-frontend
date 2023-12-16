import { useState } from 'react'
import Circle from './components/Circle'
import PathUp from './components/Paths/Path1'
import { useQuery, gql,ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import './App.css'
import { Grid } from '@mui/material'
import LessonTreeGenerator from './components/LessonTreeGenerator';
import Login from './components/Logowanie/Login';
import AccountPage from './components/Account/AccountPage';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lessons from "./components/Lessons/LessonsTrees";
import LessonTrees from './components/Lessons/LessonsTrees';
import SignIn from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';

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
  const [count, setCount] = useState(0)
  // const { data, loading, error } = useQuery(GetQuery);

  // if (loading) return "Loading...";
  // if (error) return <pre>{error.message}</pre>
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/account" element={<AccountPage />}/>
        <Route path="/trees" element={<LessonTrees/>}/>
        <Route path="/lesson" element={ <LessonTreeGenerator/>} />
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
