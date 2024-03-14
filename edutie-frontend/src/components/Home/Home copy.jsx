import { Card, Typography, Grid, Container } from "@mui/material";
import Header from "../Global/Header";
import { createTheme } from "@mui/material";
import Widget from "./HomeComponents/Widget"
import LineChartWidget from "./HomeComponents/LineChartWidget"
import CircleChart from "./HomeComponents/CircleChart";
import News from "./HomeComponents/News";
import Socials from "./HomeComponents/Socials";
import NavBar from "../Global/NavBar";
import Welcome from "./HomeComponents/Welcome";

export default function Home()
{
    return(
            <Container>                    
                <Grid container width="80vw" spacing={4}>
                        <Grid item xs={12}>
                            <Welcome/> 
                        </Grid>
                        <Grid item xs={4} md={4}> 
                            <Widget
                            title="Przerobione Lekcje"
                            total={40}
                            color="success"
                            icon={<img alt="icon" src="../../../src/assets/video-lesson.png" />}
                            />
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Widget
                            title="Zakończone Drzewka"
                            total={2}
                            color="success"
                            icon={<img alt="icon" src="../../../src/assets/tree.png" />}
                            />
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Widget
                            title="czasu spędzonego"
                            total={'4h'}
                            color="success"
                            icon={<img alt="icon" src="../../../src/assets/clock.png" />}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <LineChartWidget/>
                        </Grid>
                        <Grid item xs={4}>
                            <CircleChart/>
                        </Grid>
                        <Grid item xs={8}>
                            <News/>
                        </Grid>
                        <Grid item xs={4}>
                            <Socials/>
                        </Grid>
                    </Grid>
                </Container>

    )
}