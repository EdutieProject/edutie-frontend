import { Typography, Grid, Box, useTheme } from "@mui/material"
import NavLayout from "./layout/NavLayout"
import Surface from "../components/global/Surface"
import Example from "../components/charts/LineChart"
import CircleButton from "../components/global/CircleButton"
import studentGraduationCap from "../assets/svg/student-graduation-cap.svg"
import learningBook from "../assets/img/learning-book.png"
import trygonometriaImg from "../assets/img/trygonometria.png"
import funkcjeImg from "../assets/img/funkcje.png"
import { useEffect, useState } from "react"
import { getRandomFact } from "../services/LearningService"
import ErrorView from "./common/ErrorView"
import LoadingView from "./common/LoadingView"
import RoundedButton from "../components/global/RoundedButton"
import Heading from "../components/global/Heading"

const user = {
    name: { first: "Szymon" },
}

const funkcje = { img: funkcjeImg, title: "Funkcje" }
const tags = { new: "Coś nowego", repeat: "Idealna powtórka" }
const ls = [
    { title: "Własności trogonometryczne w układzie współrzędnych", img: studentGraduationCap, tag: tags.new },
    { title: "Własności trogonometryczne w układzie współrzędnych", img: learningBook, tag: tags.new },
    { title: "Własności trogonometryczne w układzie współrzędnych", img: learningBook, tag: tags.repeat }
]

export default function HomeView() {
    const theme = useTheme();
    const [error, setError] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const [randomFact, setRandomFact] = useState(null);
    const [dynamicLearningResourceLoading, setDynamicLearningResourceLoading] = useState(false);

    useEffect(() => {
        getRandomFact().then(randomFactResponse => {
            if (randomFactResponse.success === false) {
                setError(randomFactResponse.error);
                return;
            }
            setRandomFact(randomFactResponse.data.fact);
            setInitialLoading(false);
        });
    }, []);

    if (error)
        return <ErrorView error={error} />

    if (initialLoading || dynamicLearningResourceLoading)
        return <LoadingView />

    return (
        <NavLayout>
            <Grid container rowGap={theme.spacing(4)}>
                <Grid item xs={12}>
                    <Heading variant="h2">Hej {user.name.first}!</Heading>
                    <Typography variant="subtitle1">Dobrze cię znowu widzieć 😁</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Heading variant="h8">Czy wiesz że...</Heading>
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: theme.spacing(8), alignItems: "center" }}>
                        <Typography variant="body1">{randomFact}</Typography>
                        <RoundedButton active label="Naucz się więcej" />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h8" fontFamily="Baloo">Zobacz co więcej przygotowaliśmy dla Ciebie:</Typography>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: theme.spacing(4),
                        gap: theme.spacing(6)
                    }}>
                        {
                            ls.map((l) => (
                                <HomeTile lesson={l} course={funkcje} />
                            ))
                        }
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {/** TODO! */}
                </Grid>
            </Grid>
        </NavLayout>
    );
}

function HomeTile({ course = { img, title }, lesson = { img, title, tag } }) {
    const theme = useTheme();
    const styles = {
        courseContainer: {
            display: "flex",
            gap: 2,
            alignItems: "center"
        },
        lessonContainer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        },
        tag: {
            backgroundColor: theme.palette.secondary.light,
            padding: "0.8rem",
            paddingBottom: "0.5rem",
            borderRadius: "2rem",
            boxSizing: "border-box",
            width: "12rem",
            fontFamily: "Baloo",
            textAlign: "center",
            fontSize: "1rem",
            lineHeight: "1rem",
            position: "absolute",
            right: "15%",
            top: "-20%",
            color: theme.palette.getContrastText(theme.palette.secondary.light)
        }
    }
    const Tag = () => (<div style={styles.tag}>{lesson.tag}</div>)
    return (
        <Surface style={{ padding: "1rem", paddingRight: "2rem" }} sx={{position: "relative"}}>
            <Grid>
                <Tag />
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid container flexWrap="nowrap" justifyContent="space-between" alignItems={"center"} style={{ width: "auto", minWidth: "75%", maxWidth: "calc(100% - 6rem)" }} >
                        <Box sx={styles.courseContainer} maxWidth="50%">
                            <img src={course.img} style={{ height: "3.5rem", width: "3.5rem", aspectRatio: 1, fill: "black" }} alt=" " />
                            <Typography variant="h6" fontFamily="Baloo">{course.title}</Typography>
                        </Box>
                        <Box sx={styles.lessonContainer} minWidth="50%">
                            <img src={lesson.img} style={{ height: "2rem", width: "2rem", aspectRatio: 1, fill: "black" }} alt=" " />
                            <Typography variant="h9" fontSize="0.8rem" textAlign="center" lineHeight="0.9rem" style={{ wordWrap: "break-word", padding: 0 }}>{lesson.title}</Typography>
                        </Box>
                    </Grid>
                    <LessonButton size="1.5rem" style={{ aspectRatio: 1 }} />
                </Grid>
            </Grid>
        </Surface>
    )
}

const LessonButton = ({ size }) => (<CircleButton size={size}><Typography fontFamily="Baloo" color="white" fontSize={size}>{">"}</Typography></CircleButton>)
