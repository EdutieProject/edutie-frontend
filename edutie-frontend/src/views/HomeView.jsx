import { Typography, Grid, Box, useTheme, Button, IconButton } from "@mui/material";
import NavLayout from "./layout/NavLayout";
import Surface from "../components/global/Surface";
import Example from "../components/charts/LineChart";
import ChevronRight from "@material-ui/icons/ChevronRight"
import clock from "../assets/img/clock.png"
import { useEffect, useState } from "react";

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

export default function HomeView()
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
                            <Typography variant="h2" fontFamily="Baloo">Cześć Michał!</Typography>
                            <Typography variant="subtitle1">Dobrze cię znowu widzieć</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container flexDirection={"column"} gap={theme.spacing(2)}>
                            <HomeTile imgSrc={clock} title={"Funkcje trygonometryczne w układzie współrzędnych"} middle={"Trygonometria"} right={"18%"}/>
                            <HomeTile imgSrc={clock} title={"Funkcje trygonometryczne w układzie współrzędnych"} middle={"Trygonometria"} right={"18%"}/>
                        </Grid>
                    </Grid> 
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h4" marginY={theme.spacing(2)}>
                            Wybrane dla ciebie:
                        </Typography>
                        <Box sx={styles.suggestionBox}>
                        {
                            suggestedElements.map((item) =>
                                <HomeTile imgSrc={clock} title={item.title} middle={"Geometria"} right={"38%"}/>
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

function HomeTile({imgSrc, title, middle, right, href}) {
    const styles = {
        surfaceElementTitleBox: {
            display: "flex",
            gap: 2,
            alignItems: "center"
        }
    }

    return (
        <Surface>
            <Grid container justifyContent={"space-around"} alignItems={"center"}>
                <Box sx={styles.surfaceElementTitleBox}>
                    <img src={imgSrc} width={48} height={48} />
                    <Typography variant="h6">{title}</Typography>
                </Box>
                <Typography variant="body1">
                    {middle}
                </Typography>
                <Typography variant="body1">
                    {right}
                </Typography>
                <Button variant="contained" disableElevation endIcon={<ChevronRight/>} href={href}>
                    Przejdź
                </Button>
            </Grid>
        </Surface>
    )
}