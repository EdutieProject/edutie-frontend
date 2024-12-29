import { Box, Divider, Grid, Typography, useTheme } from "@mui/material";
import NavLayout from "./layout/NavLayout.js";
import React, { useEffect, useState } from "react";
import { generateDynamicLearningResource, getLatestActivity, getRandomFact } from "../services/learningService";
import ErrorView from "./common/ErrorView.js";
import LoadingView from "./common/LoadingView.js";
import RoundedButton from "../components/global/RoundedButton.js";
import Heading from "../components/global/Heading.js";
import { useNavigate } from "react-router-dom";
import { navigationPath, navSections } from "../features/navigation/navigationPath.js";
import { getUserDetails } from "../services/userProfileService";
import { getRandomFactSaveDate, getSavedRandomFact, saveRandomFact } from "../features/storage/RandomFactStorage";
import { isItSameDay } from "../features/datetime/datetimeUtilities";
import LightBulbDoodleIcon from "../components/customIcons/LightBulbIcon";
import SadColorfulFaceIcon from "../components/customIcons/SadColorfulFaceIcon";
import CircularProgressWithLabel from "../components/progress/CircularProgressWithLabel";
import SweatFaceIcon from "../components/customIcons/SweatFaceIcon";
import JoyColorfulFaceIcon from "../components/customIcons/JoyColorfulFaceIcon";
import NormalColorfulFaceIcon from "../components/customIcons/NormalColorfulFaceIcon";
import { IconButton } from "@mui/material";
import { Container } from "@mui/material";
import "./layout/mobile.scss";
import { BorderColorTwoTone } from "@mui/icons-material";

export default function HomeView() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [error, setError] = useState<any>(null);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [randomFact, setRandomFact] = useState<string>("?");
  const [userFirstName, setUserFirstName] = useState(null);
  const [dynamicLearningResourceLoading, setDynamicLearningResourceLoading] = useState<boolean>(false);
  const [latestActivity, setLatestActivity] = useState<any>(null);

  const average = (array: Array<any>) => array.reduce((a, b) => a + b) / array.length;

  const iconSize = "8rem";
  const getIcon = (averageGrade: number) =>
    averageGrade > 4 ? (
      <JoyColorfulFaceIcon width={iconSize} height={iconSize} />
    ) : averageGrade > 2 ? (
      <NormalColorfulFaceIcon width={iconSize} height={iconSize} />
    ) : (
      <SadColorfulFaceIcon width={iconSize} height={iconSize} />
    );

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
      saveRandomFact(randomFactResponse.data.fact);
      setRandomFact(randomFactResponse.data.fact);
    }

    const latestActivityResponse = await getLatestActivity();
    if (latestActivityResponse.success === false && latestActivityResponse.error.code !== "NO-CONTENT-200") {
      setError(latestActivityResponse.error);
      return;
    }
    console.log(latestActivityResponse.data);
    setLatestActivity(latestActivityResponse.data);

    setInitialLoading(false);
  }

  useEffect(() => {
    initialLoad();
  }, []);

  async function dynamicLearningResourceLoad() {
    if (!dynamicLearningResourceLoading) return;
    const learningResourceResponse = await generateDynamicLearningResource(randomFact);
    if (learningResourceResponse.success === false) {
      setError(learningResourceResponse.error);
      return;
    }
    navigate(navigationPath.fillPath(navigationPath.exercise, learningResourceResponse.data.id), {
      state: learningResourceResponse.data,
    });
  }

  useEffect(() => {
    dynamicLearningResourceLoad();
  }, [dynamicLearningResourceLoading]);

  if (window.screen.width < 768) {
    return (
      <Container
        direction="column"
        class="hero-gradient"
        sx={{
          // backgroundColor: theme.palette.primary.main,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Grid
          sx={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 80%)",
            backgroundColor: "white",
            height: 180,
            marginBottom: 20,
            position: "fixed",
            width: "100%",
          }}>
          BIG ASS LOGO EDUTIE
        </Grid>
        <Grid
          container
          direction="row"
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Grid sx={{ marginTop: theme.spacing(28) }}>
            <Typography align="center" color={theme.palette.accentSecond.dark} fontFamily={"Baloo"} variant="h5">
              Cześć!
            </Typography>
            <Typography
              sx={{ marginLeft: 5, marginRight: 5, marginBottom: 2 }}
              align="center"
              color={theme.palette.accentSecond.dark}
              fontFamily={"Geologica"}
              variant="body1">
              Tym razem to my jesteśmy nieprzygotowani i na urządzeniach mobilnych nasza strona nie jest jeszcze
              dostępna.
            </Typography>
            <Typography align="center" color={theme.palette.accentSecond.dark} fontFamily={"Geologica"} variant="body1">
              ...chyba będzie minus do dzienniczka.
            </Typography>
            <Grid
              container
              direction="column"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: theme.spacing(2),
              }}>
              <img src="..\src\assets\img\pleading-face.png" alt="emoji" height="auto" width="35px" />
              <Grid
                container
                direction="row"
                sx={{
                  gap: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <img src="..\src\assets\img\right-hand.png" alt="emoji" height="auto" width="30px" />

                <img src="..\src\assets\img\left-hand.png" alt="emoji" height="auto" width="30px" />
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5,
              }}>
              <a href="https://discord.com/invite/UAYCpZXFAE">
                <RoundedButton
                  sx={{
                    border: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 3,
                  }}
                  leftIcon={<img src="..\src\assets\img\discord.png" alt="discord" height="auto" width="30px" />}
                  label={"Dołącz do discorda"}
                  active={true}></RoundedButton>
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error) return <ErrorView error={error} />;

  if (initialLoading) return <LoadingView />;
  if (dynamicLearningResourceLoading)
    return <LoadingView caption={"Przygotowujemy dla Ciebie materiały. Zazwyczaj zajmuje to około 15 sekund."} />;

  return (
    <NavLayout activeSectionIdOverride={navSections.home}>
      <Box>
        <Heading variant="h2">
          Hej <span style={{ color: theme.palette.accentSecond.main }}>{userFirstName}</span>!
        </Heading>
        <Typography variant="subtitle1">Dobrze cię znowu widzieć 😁</Typography>
      </Box>
      <Box sx={{ marginY: theme.spacing(6), display: "flex", gap: theme.spacing(2), alignItems: "center" }}>
        <LightBulbDoodleIcon width={"8rem"} height={"8rem"} />
        <Box>
          <Heading variant="h6">Czy wiesz że...</Heading>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: theme.spacing(8),
              alignItems: "center",
            }}>
            <Typography variant="body1">{randomFact}</Typography>
            <RoundedButton active label="Naucz się więcej" onClick={() => setDynamicLearningResourceLoading(true)} />
          </Box>
        </Box>
      </Box>
      <Divider flexItem />
      <Box sx={{ display: "grid", placeItems: "center", my: theme.spacing(2) }}>
        <Typography>Twoja ostatnia aktywność:</Typography>
      </Box>
      {latestActivity !== null ? (
        <>
          {latestActivity.latestCourseView !== null ? (
            <Grid container rowSpacing={theme.spacing(6)} marginTop={1}>
              <Grid
                item
                lg={6}
                xs={12}
                sx={{
                  padding: theme.spacing(4),
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: theme.spacing(2),
                }}>
                <img
                  src={
                    latestActivity.latestCourseView.course.imageSource ??
                    "https://www.svgrepo.com/show/452479/question-mark.svg"
                  }
                  alt={"Course image"}
                  style={{ width: "8rem", height: "8rem" }}
                />
                <Heading variant={"h4"}>{latestActivity.latestCourseView.course.name}</Heading>
                <Typography>w: {latestActivity.latestCourseView.course.science.name}</Typography>
                <Box sx={{ display: "flex", gap: theme.spacing(2) }}>
                  <Typography>Postęp: </Typography>
                  <CircularProgressWithLabel
                    label={`${latestActivity.latestCourseView.progressIndicator * 100}%`}
                    variant="determinate"
                    value={latestActivity.latestCourseView.progressIndicator * 100}
                    thickness={8}
                    color="accentSecond"
                    size={"1.5rem"}
                  />
                </Box>
                <RoundedButton
                  label={"Wróć do ostatniego zestawu"}
                  active
                  onClick={() =>
                    navigate(
                      navigationPath.fillPath(navigationPath.lessonTree, latestActivity.latestCourseView.course.id)
                    )
                  }
                />
              </Grid>
              <Grid
                item
                lg={6}
                xs={12}
                sx={{
                  padding: theme.spacing(4),
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: theme.spacing(2),
                }}>
                {getIcon(latestActivity.latestLearningResult.averageGradeRounded)}
                <Heading variant={"h4"}>Ostatni rezultat</Heading>
                <Typography>Średnia ocena: {latestActivity.latestLearningResult.averageGradeRounded}</Typography>
                <Box sx={{ display: "flex", gap: theme.spacing(2) }}>
                  <Typography>Trudność: </Typography>
                  <CircularProgressWithLabel
                    label={`${Math.round(average(
                      latestActivity.latestLearningResult.assessments.map((o: any) => o.difficultyFactor * 100)
                    ))}%`}
                    variant="determinate"
                    value={average(
                      latestActivity.latestLearningResult.assessments.map((o: any) => o.difficultyFactor * 100)
                    )}
                    thickness={8}
                    color="accentFirst"
                    size={"1.5rem"}
                  />
                </Box>
                <RoundedButton
                  label={"Zobacz ostatni feedback"}
                  active
                  onClick={() =>
                    navigate(
                      navigationPath.fillPath(navigationPath.learningResult, latestActivity.latestLearningResult.id)
                    )
                  }
                />
              </Grid>
            </Grid>
          ) : (
            <Grid
              item
              xs={12}
              sx={{
                padding: theme.spacing(4),
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: theme.spacing(2),
              }}>
              {getIcon(latestActivity.latestLearningResult.averageGradeRounded)}
              <Heading variant={"h4"}>Ostatni rezultat</Heading>
              <Typography>Średnia ocena: {latestActivity.latestLearningResult.averageGradeRounded}</Typography>
              <Box sx={{ display: "flex", gap: theme.spacing(2) }}>
                <Typography>Trudność: </Typography>
                <CircularProgressWithLabel
                  label={`${Math.round(average(
                    latestActivity.latestLearningResult.assessments.map((o: any) => o.difficultyFactor * 100)
                  ))}%`}
                  variant="determinate"
                  value={80}
                  thickness={8}
                  color="accentFirst"
                  size={"1.5rem"}
                />
              </Box>
              <RoundedButton
                label={"Zobacz ostatni feedback"}
                active
                onClick={() =>
                  navigate(
                    navigationPath.fillPath(navigationPath.learningResult, latestActivity.latestLearningResult.id)
                  )
                }
              />
            </Grid>
          )}
        </>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            gap: theme.spacing(12),
            justifyContent: "center",
            alignItems: "center",
            my: theme.spacing(4),
          }}>
          <SweatFaceIcon width={"12rem"} height={"12rem"} />
          <Box>
            <Heading variant="h6">Niczego nie znaleźliśmy</Heading>
            <Typography>Widocznie niewiele się ostatnio uczysz... </Typography>
          </Box>
        </Box>
      )}
    </NavLayout>
  );
}
