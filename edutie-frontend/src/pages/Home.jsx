import { Typography, Grid, Box, useTheme, Button, IconButton } from "@mui/material";
import NavLayout from "./layout/NavLayout";
import Surface from "../components/Tile";
import Example from "../components/charts/LineChart";
import ChevronRight from "@material-ui/icons/ChevronRight"
import clock from "../assets/img/clock.png"

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
    const theme = useTheme();

    const styles = {
        suggestionBox: {
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(2)
        },
        surfaceElementTitleBox: {
            display: "flex",
            gap: 2,
            alignItems: "center"
        }
    };

    return(
            <NavLayout>                    
                <Grid container rowGap={theme.spacing(4)} paddingY={theme.spacing(4)}>
                    <Grid item xs={12}>
                            <Typography variant="h2">Cześć Michał!</Typography>
                            <Typography variant="subtitle1">Dobrze cię znowu widzieć</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container flexDirection={"column"} gap={theme.spacing(2)}>
                            <Surface>
                                <Grid container justifyContent={"space-around"} alignItems={"center"}>
                                    <Box sx={styles.surfaceElementTitleBox}>
                                        <img src={clock} width={48} height={48}/>
                                        <Typography variant="h6">Hello World!</Typography>
                                    </Box>
                                    <IconButton>
                                        <ChevronRight/>
                                    </IconButton>
                                </Grid>
                            </Surface>
                            <Surface>
                                <Grid container justifyContent={"space-around"} alignItems={"center"}>
                                    <Box sx={styles.surfaceElementTitleBox}>
                                        <img src={clock} width={48} height={48}/>
                                        <Typography variant="h6">Hello World!</Typography>
                                    </Box>
                                    <IconButton>
                                        <ChevronRight color="primary"/>
                                    </IconButton>
                                </Grid>
                            </Surface>
                        </Grid>
                    </Grid> 
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h4" marginY={theme.spacing(2)}>
                            Wybrane dla ciebie:
                        </Typography>
                        <Box sx={styles.suggestionBox}>
                        {
                            suggestedElements.map((item) =>
                                <Surface>
                                    <Typography>{item.title}</Typography>
                                </Surface>
                            )
                        }
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Example/>
                    </Grid>
                </Grid>
            </NavLayout>
    );
}