import { Card, Typography, Grid, Container } from "@mui/material";
import Header from "../components/Global/Header";
import { createTheme } from "@mui/material";
import Widget from "../components/Home/HomeComponents/Widget"
import LineChartWidget from "../components/Home/HomeComponents/LineChartWidget"
import CircleChart from "../components/charts/CircleChart";
import News from "../components/News";
import Socials from "../components/Home/HomeComponents/Socials";
import NavBar from "../components/Global/NavBar";
import Welcome from "../components/Home/HomeComponents/Welcome";
import EdutiePaper from "../components/EdutiePaper";


const suggestedElements = [
    {
        id: 1,
        title: "Powtórz sobie ten temat",
        paperTitle: "Matematyka Dyskretna",
        paperSubTitle: "by Włodzimierz Chudy"
    },
    {
        id: 2,
        title: "Przećwicz swoje słabości",
        paperTitle: "Fizyka Kinematyka",
        paperSubTitle: "by Włodzimierz Chudy"
    },
    {
        id:3,
        title: "Naucz się czegoś nowego",
        paperTitle: "Fizyka Jądrowa",
        paperSubTitle: "by Włodzimierz Chudy"
    }
]

export default function Home()
{
    return(
            <Container>                    
                <Grid container width="80vw">
                        <Grid item xs={12}>
                            <Welcome/> 
                        </Grid>
                        <Grid item xs={12}> 
                           <EdutiePaper /> 
                        </Grid>
                        <Grid item container xs={12} direction="column" mt={4}> 
                            <Grid container xs={7}>
                                <Grid item xs={12}>
                                    <Typography variant="h5" fontWeight={600}>
                                        Sugerowane:
                                    </Typography>
                                </Grid>
                                <Grid container>
                                {
                                    suggestedElements.map((item) => {return(
                                        <Grid item mt={5} xs={12}>
                                            <Typography>
                                               {item.title} 
                                            </Typography>
                                               <EdutiePaper
                                                imgHeight={100}
                                                imgWidth={100}
                                                itemTitle={item.paperTitle}
                                                itemSubTitle={item.paperSubTitle}
                                            />
                                        </Grid>
                                    )
                                    })
                                }
                                </Grid>
                            </Grid>
                            <Grid item container xs={5} >
                                <Grid item >
                                <Typography variant="h5" fontWeight={600}>
                                    Ostatni Progres
                                </Typography>
                                </Grid>
                            </Grid>
                            
                        </Grid>
                    </Grid>
                </Container>
    )
}