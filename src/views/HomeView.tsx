import {Box, CircularProgress, Divider, Grid, Typography, useTheme} from "@mui/material"
import NavLayout from "./layout/NavLayout.js"
import React, {useEffect, useState} from "react"
import {generateRandomFactLearningResource, getRandomFact} from "../services/learningService"
import ErrorView from "./common/ErrorView.js"
import LoadingView from "./common/LoadingView.js"
import RoundedButton from "../components/global/RoundedButton.js"
import Heading from "../components/global/Heading.js"
import {useNavigate} from "react-router-dom"
import {navigationPath} from "../features/navigation/navigationPath.js"
import {getUserDetails} from "../services/userProfileService";
import {getRandomFactSaveDate, getSavedRandomFact, saveRandomFact} from "../features/storage/RandomFactStorage";
import {isItSameDay} from "../features/datetime/datetimeUtilities";
import DistributedLearningIcon from "../components/customIcons/DistributedLearningIcon";
import Surface from "../components/global/Surface";
import UserIcon from "../components/customIcons/StudentUserIcon";
import CoursesIcon from "../components/customIcons/CoursesIcon";
import LightBulbDoodleIcon from "../components/customIcons/LightBulbIcon";
import SadColorfulFaceIcon from "../components/customIcons/SadColorfulFaceIcon";

export default function HomeView() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [error, setError] = useState<any>(null);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [randomFact, setRandomFact] = useState<string>("?");
    const [userFirstName, setUserFirstName] = useState(null);
    const [dynamicLearningResourceLoading, setDynamicLearningResourceLoading] = useState<boolean>(false);

    async function initialLoad() {
        const userDetailsResponse = await getUserDetails();
        if (userDetailsResponse.success === false) {
            setError(userDetailsResponse.error);
            return;
        }
        setUserFirstName(userDetailsResponse.data.firstName);

        const savedRandomFact = getSavedRandomFact();
        if (savedRandomFact !== null && isItSameDay(new Date(), getRandomFactSaveDate() as Date)) {
            setRandomFact(savedRandomFact);
        } else {
            const randomFactResponse = await getRandomFact();
            if (randomFactResponse.success === false) {
                setError(randomFactResponse.error);
                return;
            }
            saveRandomFact(randomFactResponse.data.fact)
            setRandomFact(randomFactResponse.data.fact);
        }

        setInitialLoading(false);
    }

    useEffect(() => {
        initialLoad();
    }, []);

    async function dynamicLearningResourceLoad() {
        if (!dynamicLearningResourceLoading)
            return;
        const learningResourceResponse = await generateRandomFactLearningResource(randomFact);
        if (learningResourceResponse.success === false) {
            setError(learningResourceResponse.error);
            return;
        }
        navigate(navigationPath.fillPath(navigationPath.exercise, learningResourceResponse.data.id), {state: learningResourceResponse.data});
    }

    useEffect(() => {
        dynamicLearningResourceLoad();
    }, [dynamicLearningResourceLoading]);

    if (error)
        return <ErrorView error={error}/>

    if (initialLoading || dynamicLearningResourceLoading)
        return <LoadingView/>

    return (
        <NavLayout mode={"flex"} scroll>
            <Box>
                <Heading variant="h2">Hej {userFirstName}!</Heading>
                <Typography variant="subtitle1">Dobrze cię znowu widzieć 😁</Typography>
            </Box>
            <Box sx={{marginY: theme.spacing(6), display: 'flex', gap: theme.spacing(2), alignItems: "center"}}>
                <LightBulbDoodleIcon width={"8rem"} height={"8rem"}/>
                <Box>
                    <Heading variant="h6">Czy wiesz że...</Heading>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: theme.spacing(8),
                        alignItems: "center"
                    }}>
                        <Typography variant="body1">{randomFact}</Typography>
                        <RoundedButton active label="Naucz się więcej"
                                       onClick={() => setDynamicLearningResourceLoading(true)}/>
                    </Box>
                </Box>
            </Box>
            <Divider flexItem/>
            <Box sx={{display: "grid", placeItems: "center", my: theme.spacing(2)}}>
                <Typography>Twoja ostatnia aktywność:</Typography>
            </Box>
            <Grid container rowSpacing={theme.spacing(6)} marginTop={1}>
                <Grid item lg={6} xs={12} sx={{padding: theme.spacing(4), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: theme.spacing(4)}}>
                    <img src={"https://www.svgrepo.com/show/452651/globe.svg"} alt={"Course image"}
                    style={{width: "8rem", height: "8rem"}}/>
                    <Heading variant={"h4"}>Przykładowy zestaw</Heading>
                    <Typography>Ostatnia lekcja: Trygonometria</Typography>
                    <Box sx={{display: "flex", gap: theme.spacing(2)}}>
                        <Typography>Postęp: </Typography>
                        <CircularProgress variant="determinate" value={67} thickness={8} color="secondary" size={"1.5rem"} />
                    </Box>
                    <RoundedButton label={"Wróć do ostatniego zestawu"} active/>
                </Grid>
                <Grid item lg={6} xs={12} sx={{padding: theme.spacing(4), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: theme.spacing(4)}}>
                    <SadColorfulFaceIcon width={"8rem"} height={"8rem"}/>
                    <Heading variant={"h4"}>Ostatni rezultat</Heading>
                    <Typography>Średnia ocena: 5</Typography>
                    <Box sx={{display: "flex", gap: theme.spacing(2)}}>
                        <Typography>Trudność: </Typography>
                        <CircularProgress variant="determinate" value={67} thickness={8} color="secondary" size={"1.5rem"} />
                    </Box>
                    <RoundedButton label={"Zobacz ostatni feedback"} active/>
                </Grid>
            </Grid>
        </NavLayout>
    );
}