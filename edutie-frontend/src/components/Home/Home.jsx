import { Card, Typography, Grid, Container } from "@mui/material";
import Header from "../Global/Header";
import Widget from "./Widget"
import LineChartWidget from "./LineChartWidget"
import CircleChart from "./CircleChart";
import News from "./News";
import Socials from "./Socials";

export default function Home()
{
    return(
        <Container maxWidth={false}>
            <Header left={"1"} middle={"2"} right={"3"}/>
            
            <Grid container direction='row' spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h4" sx={{flex:1, ml:0, mr:'60%' }}>
                        Cześć! Witaj z powrotem! 👋
                    </Typography>
                </Grid>
                <Grid item xs={4}> 
                    <Widget
                    title="Przerobione Lekcje"
                    total={40}
                    color="success"
                    icon={<img alt="icon" src="../../../src/assets/video-lesson.png" />}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Widget
                    title="Zakończone Drzewka"
                    total={2}
                    color="success"
                    icon={<img alt="icon" src="../../../src/assets/tree.png" />}
                    />
                </Grid>
                <Grid item xs={4}>
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