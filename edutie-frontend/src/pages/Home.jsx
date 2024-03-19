import { Typography, Grid, Box, useTheme } from "@mui/material";
import NavLayout from "./layout/NavLayout";


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

function Tile({children}) {
    const theme = useTheme();

    return(
    <Box sx={{
        background: theme.palette.grey[200], //CHANGE TO STH LIKE "SURFACE"
        padding: theme.spacing(2),
        borderRadius: 2
    }}>
        { children }
    </Box>
    )
}

export default function Home()
{
    const theme = useTheme();

    const styles = {
        suggestionBox: {
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(2)
        }
    }

    return(
            <NavLayout>                    
                <Grid container 
                rowGap={theme.spacing(8)} 
                >
                    <Grid item xs={12} padding={theme.spacing(2)}>
                            <Typography variant="h2"> Cześć! </Typography>
                            <Typography variant="subtitle1"> Wróć do nauki 🔜 </Typography>
                            <Tile>
                                <Typography variant="body">Tutaj powinno być to co ostatnio robiłeś.</Typography>
                            </Tile>
                    </Grid> 
                    <Grid item xs={12} sm={6} padding={theme.spacing(2)}>
                        <Typography variant="h3" marginY={theme.spacing(2)}>
                            Sugestie dla ciebie:
                        </Typography>
                        <Box sx={styles.suggestionBox}>
                        {
                            suggestedElements.map((item) =>
                                <Tile>
                                    <Typography>{item.title}</Typography>
                                </Tile>
                            )
                        }
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} padding={theme.spacing(2)}>
                        <Typography>Your stats</Typography>
                    </Grid>
                </Grid>
            </NavLayout>
    );
}