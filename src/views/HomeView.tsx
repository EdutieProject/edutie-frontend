import {Box, Divider, Grid, Typography, useTheme} from "@mui/material"
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
        <NavLayout mode={"flex"}>
            <Box>
                <Heading variant="h2">Hej {userFirstName}!</Heading>
                <Typography variant="subtitle1">Dobrze cię znowu widzieć 😁</Typography>
            </Box>
            <Box sx={{marginY: theme.spacing(6)}}>
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
            <Divider flexItem/>
            <Grid container marginTop={theme.spacing(6)}>
                <Grid item lg={4} xs={12} paddingX={theme.spacing(8)} paddingY={theme.spacing(2)}>
                    <Surface sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyItems: "center",
                        paddingY: theme.spacing(4),
                        gap: theme.spacing(4),
                        height: "100%"
                    }}>
                        <Box sx={{
                            borderRadius: 99,
                            padding: theme.spacing(3),
                            backgroundColor: theme.palette.common.white
                        }}>
                            <CoursesIcon width={"4rem"} height={"4rem"}
                                         color={theme.palette.secondary.main}/>
                        </Box>
                        <Heading>Korzystaj z zestawów</Heading>
                        <Typography textAlign={"center"}>
                            Ucz się korzystając z zestawów do nauki przygotowanych przez edukatorów
                        </Typography>
                    </Surface>
                </Grid>
                <Grid item lg={4} xs={12} paddingX={theme.spacing(8)} paddingY={theme.spacing(2)}>
                    <Surface sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyItems: "center",
                        paddingY: theme.spacing(4),
                        gap: theme.spacing(4),
                        height: "100%"
                    }}>
                        <Box sx={{
                            borderRadius: 99,
                            padding: theme.spacing(3),
                            backgroundColor: theme.palette.common.white
                        }}>
                            <UserIcon width={"4rem"} height={"4rem"}
                                      color={theme.palette.secondary.main}/>
                        </Box>
                        <Heading>Obserwuj swoją naukę</Heading>
                        <Typography textAlign={"center"}>
                            Śledź swój proces nauki i bądź świadom tego, w jaki sposób budujesz swoją wiedzę.
                        </Typography>
                    </Surface>
                </Grid>
                <Grid item lg={4} xs={12} paddingX={theme.spacing(8)} paddingY={theme.spacing(2)}>
                    <Surface sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyItems: "center",
                        paddingY: theme.spacing(4),
                        gap: theme.spacing(4),
                        height: "100%"
                    }}>
                        <Box sx={{
                            borderRadius: 99,
                            padding: theme.spacing(3),
                            backgroundColor: theme.palette.common.white
                        }}>
                            <DistributedLearningIcon width={"4rem"} height={"4rem"}
                                                     color={theme.palette.secondary.main}/>
                        </Box>
                        <Heading>Odkrywaj nowe zagadnienia</Heading>
                        <Typography textAlign={"center"}>
                            Korzystaj z mapy wiedzy, która pokaże ci nowe tematy bazując na twoich poprzednich osiągnięciach.
                        </Typography>
                    </Surface>
                </Grid>
            </Grid>
        </NavLayout>
    );
}