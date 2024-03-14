import { Typography, Grid } from "@mui/material";
import { Container,  } from "@mui/system";
import Circle from "./Circle";
import { useQuery, gql, ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { useState } from "react";
import PathUp from "./Paths/Path1";
import Header from './Global/Header'

const GetQuery = gql`
        query GetQuery 
        {
          lessons {
            id
            name
            next
            active
            previous
          }
        }`;

function getLessonById(id)
{
    return gql`
        query GetQuery 
        {
          lesson(id:id) {
            id
            name
            next
            active
            previous
          }
        }`;
    
}
const lessonsTree = [
    1,
    [2,2,2,2],
    0,
    [1,0,1]
    
]



export default function LessonTreeGenerator()
{

    const [count, setCount] = useState(0)
    const { data, loading, error } = useQuery(GetQuery);

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>

    

    return(
        <div>
            <Header/>
            <Grid container  direction="column" >
            { 
                lessonsTree.map( lesson => {
                     return(
                        <>
                            {Number.isInteger(lesson) && 
                                    data.lessons.filter(qlesson => qlesson.id == lesson).map(n => {
                                                return (
                                                    <>
                                                        <Grid item mt={5} mb={5} key={n.id}>
                                                            <Circle title={n.name}/>
                                                        </Grid>
                                                    </>
                                                )   
                                        })
                            }
                            {Array.isArray(lesson) &&

                                <Grid container spacing={10} direction="row" sx={{flex:1, justifyContent:'center'}} key={lesson.id}>
                                {lesson.map((n) => 
                                    data.lessons.filter(qlesson => qlesson.id == n).map(n => {
                                                return (
                                                    <Grid item mt={5} mb={5} key={n.id}>
                                                        <Circle title={n.name}/>
                                                    </Grid>
                                                )
                                        })
                                )
                                }
                                </Grid>
                            }
                        </>
                        
                    )
                })
            }
            </Grid>
        </div>
    )
}