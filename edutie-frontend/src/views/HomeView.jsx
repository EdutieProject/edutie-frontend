import { Typography, Grid, Box, useTheme } from "@mui/material"
import NavLayout from "./layout/NavLayout"
import Surface from "../components/global/Surface"
import Example from "../components/charts/LineChart"
import CircleButton from "../components/global/CircleButton"
import studentGraduationCap from "../assets/svg/student-graduation-cap.svg"
import learningBook from "../assets/img/learning-book.png"
import trygonometriaImg from "../assets/img/trygonometria.png"
import funkcjeImg from "../assets/img/funkcje.png"

const user = {
    name: { first: "Szymon" },
}

const trygonometria = { img: trygonometriaImg, title: "Trygonometria" }
const l1 = { img: studentGraduationCap, title: "Własności trygonometryczne w układzie współrzędnych", progress: { completed: 4, toComplete: 6 } }
const funkcje = { img: funkcjeImg, title: "Funkcje" }
const tags = { new: "Coś nowego", repeat: "Idealna powtórka" }
const ls = [
    { title: "Własności trogonometryczne w układzie współrzędnych", img: studentGraduationCap, tag: tags.new },
    { title: "Własności trogonometryczne w układzie współrzędnych", img: learningBook, tag: tags.new },
    { title: "Własności trogonometryczne w układzie współrzędnych", img: learningBook, tag: tags.repeat }
]

export default function HomeView() {
    const theme = useTheme();

    const styles = {
        suggestionBox: {
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(2)
        }
    };

    return (
        <NavLayout>
            <Grid container rowGap={theme.spacing(4)} paddingY={theme.spacing(4)}>
                <Grid item xs={12}>
                    <Typography variant="h2" fontFamily="Baloo">Hej {user.name.first}!</Typography>
                    <Typography variant="subtitle1">Good tu see you again. <FunFact /></Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h8" marginY={theme.spacing(2)} fontFamily="Baloo">Ostatnia lekcja</Typography>
                    <BigHomeTile course={trygonometria} lesson={l1} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h8" marginY={theme.spacing(2)} fontFamily="Baloo">Sugestie przygotowane dla Ciebie:</Typography>
                    <Box sx={styles.suggestionBox}>
                        {
                            ls.map((l) => (
                                <HomeTile lesson={l} course={funkcje} />
                            ))
                        }
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Example />
                </Grid>
            </Grid>
        </NavLayout>
    );
}

function BigHomeTile({ course = { img, title }, lesson = { img, title, progress } }) {
    const styles = {
        imgTextContainer: {
            display: "flex",
            gap: 2,
            alignItems: "center"
        }
    }
    return (
        <Surface style={{ padding: "2rem" }}>
            <Grid container justifyContent="space-between" >
                <Grid width="80%">
                    <Grid container justifyContent="space-around" alignItems={"center"} >
                        <Box sx={styles.imgTextContainer} width="40%">
                            <img src={course.img} style={{ height: "4.5rem", width: "4.5rem", aspectRatio: 1, fill: "black" }} alt=" " />
                            <Typography variant="h4" fontFamily="Baloo">{course.title}</Typography>
                        </Box>
                        <Box sx={styles.imgTextContainer} width="40%">
                            <img src={lesson.img} style={{ height: "2.5rem", width: "2.5rem", aspectRatio: 1, fill: "black" }} alt=" " />
                            <Typography variant="h7" style={{ wordWrap: "break-word" }}>{lesson.title}</Typography>
                        </Box>
                        <Meter />
                    </Grid>
                    <ProgressBar progress={lesson.progress} />
                </Grid>
                <LessonButton size="3rem" />
            </Grid>
        </Surface>
    )
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
            backgroundColor: "#FEF9E7",
            padding: "0.8rem",
            paddingBottom: "0.5rem",
            borderRadius: "2rem",
            boxSizing: "border-box",
            marginLeft: "calc(100% - 15rem)",
            width: "12rem",
            fontFamily: "Baloo",
            textAlign: "center",
            fontSize: "1rem",
            lineHeight: "1rem",
        }
    }
    const Tag = () => (<div style={styles.tag}>{lesson.tag}</div>)
    return (
      <Surface style={{ padding: "1rem", paddingRight: "2rem" }}>
            <Grid>
                <Tag />
                <Grid container justifyContent="space-between">
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
                    <LessonButton size="2rem" style={{ aspectRatio: 1 }} />
                </Grid>
            </Grid>
        </Surface>
    )
}

function FunFact() {
    const factStore = { getFact: () => 'Tu można dać randomową ciekawostkę związaną z statnio przebianym kontentem' }
    return (<Typography display="inline">{factStore.getFact()}</Typography>)
}

const LessonButton = ({ size }) => (<CircleButton size={size}><Typography fontFamily="Baloo" color="white" fontSize={size}>{">"}</Typography></CircleButton>)

function ProgressBar({ progress = { completed: 0, toComplete: 1 } }) {
    const percentage = Math.round((progress.completed / progress.toComplete) * 100);

    const theme = useTheme();
    const styles = {
        container: {
            display: "flex",
            flexDirection: "row",
            height: "0.6rem",
            width: "100%",
            margin: 0,
            marginTop: "1rem",
            padding: 0
        },
        progressBar: {
            width: "100%",
            height: "0.6rem",
            borderRadius: "0.3rem",
            overflow: "hidden",
        },
        progress: {
            width: `${percentage}%`,
            height: "0.6rem",
            borderRadius: "0.3rem",
            backgroundColor: theme.palette.primary.main,
        },
        text: {
            percentage: {
                color: "#8C8C8C",
            },
            container: {
                display: "flex",
                width: "10%",
                justifyContent: "space-between",
                alignItems: "center",
                margin: 0,
                padding: 0,
                lineHeight: "0.6rem",
                fontSize: "0.9rem"
            }
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.progressBar}>
                <div style={styles.progress}></div>
            </div>
            <div style={styles.text.container}>
                <span>{`${progress.completed} z ${progress.toComplete}`}</span>
                <span style={styles.text.percentage}>{`${percentage}%`}</span>
            </div>
        </div>
    );
}

const Meter = () => (<svg width="60" height="61" viewBox="0 0 60 61" fill="#2E2E2E" xmlns="http://www.w3.org/2000/svg">
    <path fill="inherit" fillRule="evenodd" clipRule="evenodd" d="M44.352 34.078L26.8986 35.6882C26.4158 35.7808 25.9836 36.0465 25.683 36.4353L23.6348 39.4719C23.4068 40.9895 23.5686 41.5933 24.4657 42.5727L27.7577 44.1783C28.2125 44.3648 28.7197 44.3787 29.184 44.2177L45.0785 36.8773C47.4428 36.057 46.8096 33.6062 44.352 34.078ZM28.5221 41.7697L38.5896 37.1203L27.5496 38.1387L26.0471 40.3664C26.0407 40.4679 26.0416 40.5283 26.0433 40.5599C26.0431 40.5595 26.0436 40.5603 26.0433 40.5599L28.5221 41.7697ZM26.0245 40.5278C26.0247 40.5279 26.0268 40.5314 26.0297 40.538C26.0256 40.5309 26.0242 40.5277 26.0245 40.5278Z" />
    <path fill="inherit" fillRule="evenodd" clipRule="evenodd" d="M30 8.30151C17.5729 8.30151 7.5 18.3698 7.5 30.788C7.5 36.9585 9.98518 42.5465 14.0129 46.6109L12.2371 48.3706C7.76451 43.8573 5 37.6441 5 30.788C5 16.9878 16.1935 5.80151 30 5.80151C43.8065 5.80151 55 16.9878 55 30.788C55 37.831 52.0829 44.195 47.394 48.7354L45.6549 46.9394C49.8777 42.8503 52.5 37.1263 52.5 30.788C52.5 18.3698 42.4271 8.30151 30 8.30151Z" />
    <path fill="inherit" fillRule="evenodd" clipRule="evenodd" d="M28.75 14.5515V8.30153L31.25 8.30151V14.5515H28.75Z" />
    <path fill="inherit" fillRule="evenodd" clipRule="evenodd" d="M45.8833 47.1366L41.3242 42.5776L43.092 40.8099L47.6511 45.3688L45.8833 47.1366Z" />
    <path fill="inherit" fillRule="evenodd" clipRule="evenodd" d="M17.6518 18.9709L13.2322 14.5516L14.9999 12.7838L19.4196 17.2031L17.6518 18.9709Z" />
    <path fill="inherit" fillRule="evenodd" clipRule="evenodd" d="M47.1053 28.3015H53.3553V30.8015H47.1053V28.3015Z" />
    <path fill="inherit" fillRule="evenodd" clipRule="evenodd" d="M6.3158 28.3015H12.5658V30.8015H6.3158V28.3015Z" />
    <path fill="inherit" fillRule="evenodd" clipRule="evenodd" d="M40.7323 17.0514L45.2915 12.4927L47.0593 14.2606L42.4999 18.8193L40.7323 17.0514Z" />
    <path fill="inherit" fillRule="evenodd" clipRule="evenodd" d="M17.746 42.8305L13.187 47.3896L11.4192 45.6219L15.9781 41.0627L17.746 42.8305Z" />
</svg>)