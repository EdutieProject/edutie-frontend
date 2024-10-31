import { Box, CircularProgress, Divider, Grid, Typography, useTheme } from "@mui/material";
import NavLayout from "./layout/NavLayout.js";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import RoundedButton from "../components/global/RoundedButton.js";
import Heading from "../components/global/Heading.js"
import { navigationPath, navSections } from "../features/navigation/navigationPath";
import {getStudentLatestLearningResults, getUserDetails} from "../services/userProfileService.js";
import LoadingView from "./common/LoadingView.js";
import ErrorView from "./common/ErrorView.js";
import SweatFaceIcon from "../components/customIcons/SweatFaceIcon.js";
import LatestStudentActivityChart from "../components/charts/studentProfile/LatestStudentActivityChart";
import DisappointedFaceIcon from "../components/customIcons/DisappointedFaceIcon.js";
import { daysAgo, getDayName } from "../features/datetime/datetimeUtilities.js";
import { useNavigate } from "react-router-dom";
import CircleButton from "../components/global/CircleButton.js";
import React from "react";

enum SubView {
  STUDENT = "STUDENT",
  SETTINGS = "SETTINGS",
  EDUCATOR = "EDUCATOR"
}

export default function ProfileView() {
  const theme = useTheme();
  const [error, setError] = useState<any>(null);
  const [userFirstName, setUserFirstName] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [currentView, setCurrentView] = useState<SubView>(SubView.STUDENT);
  const viewDetails = currentView === SubView.STUDENT ? "Profil ucznia"
      : currentView === SubView.EDUCATOR ? "Profil edukatora"
          : "Ustawienia"

  async function initialLoad() {
    const response = await getUserDetails();
    console.log(response);
    if (!response.success) {
      setError(response.error);
      return;
    }
    const firstName = response.data.firstName;
    setUserFirstName(firstName);
    setInitialLoading(false);
  }

  useEffect(() => {
    initialLoad();
  }, []);

  if (error)
    return <ErrorView error={error} />

  if (initialLoading)
    return <LoadingView/>

  return (
    <NavLayout activeSectionIdOverride={navSections.profile} mode="flex" scroll>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Heading variant='h3'>{userFirstName} - twój profil</Heading>

          <Typography variant="body1">{viewDetails}</Typography>

        </Box>
        <Box sx={{ display: "flex", gap: theme.spacing(4), alignItems: "center" }}>
          <RoundedButton label={"Uczeń"} active={currentView === SubView.STUDENT} onClick={() => setCurrentView(SubView.STUDENT)} />
          {/* <RoundedButton label={"Edukator"} active={currentView == Views.EDUCATOR} onClick={() => setCurrentView(Views.EDUCATOR)} /> */}
          <RoundedButton label={"Ustawienia"} active={currentView === SubView.SETTINGS} onClick={() => setCurrentView(SubView.SETTINGS)} />
        </Box>
      </Box>
      {
        currentView === SubView.STUDENT ? <StudentProfileView setError={setError} />
          : currentView === SubView.EDUCATOR ? <EducatorProfileView />
            : <ProfileSettingsView />
      }
    </NavLayout>
  )
}


function StudentProfileView({ setError }: {setError: Dispatch<SetStateAction<any>>}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [learningResults, setLearningResults] = useState<Array<any>>([]);

  useEffect(() => {
    getStudentLatestLearningResults().then(learningResultsResponse => {
      console.log(learningResultsResponse);
      setError(learningResultsResponse.error);
      setLearningResults(learningResultsResponse.data);
      setLoading(false);
    });
  }, [])

  const noLearningResultsIconSize = "12rem";

  const prepareLatestStudentActivityChartData = () => {
    let chartData = [];
    for (let i = 6; i >= 0; i--) {
      let chosenDayDate = daysAgo(i);
      chartData.push(
        {
          index: i,
          dayName: getDayName(chosenDayDate),
          // This is a workaround - label should be determined using the other way
          zadania: learningResults.filter((o: any) => new Date(o.createdOn).toLocaleDateString() === chosenDayDate.toLocaleDateString()).length
        }
      );
    }
    return chartData;
  };


  if (loading)
    return (<LoadingView embedded />);

  return (
    <Grid container flexGrow={1} spacing={theme.spacing(8)} marginTop={theme.spacing(6)}>
      <Grid item xs={6} sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: theme.spacing(2) }}>
        <Heading variant="h4">Twoja ostatnia aktywność:</Heading>
        {
          learningResults.length > 0 ?
            learningResults.slice(0, 3).map((learningResult, i) => (
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: theme.spacing(2) }} key={i}>
                <Divider flexItem orientation="horizontal" sx={{ marginBottom: theme.spacing(2) }} />
                <Box sx={{ display: "flex", alignItems: "center", gap: theme.spacing(2) }}>
                  <Heading variant="h5">Rezultat nauczania</Heading>
                  <CircleButton size={"1rem"} onClick={() => navigate(navigationPath.fillPath(navigationPath.learningResult, learningResult.id))}>
                    <Heading sx={{ color: theme.palette.common.white }}>{">"}</Heading>
                  </CircleButton>
                  <Typography color="grey" variant="caption">
                    {new Date(learningResult.createdOn).toLocaleDateString()}
                    {" "}
                    {new Date(learningResult.createdOn).toLocaleTimeString()}
                  </Typography>
                </Box>

                {learningResult.assessments.map((assessment: any, i: number) =>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} key={i}>
                      <Typography>{assessment.learningRequirementName}</Typography>
                      <Box sx={{ display: "flex", gap: theme.spacing(4) }}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: theme.spacing(2) }}>
                          <CircularProgress variant="determinate" value={assessment.grade / 6 * 100} thickness={8} size={"1.75rem"} />
                          <Typography>Ocena: {assessment.grade}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: theme.spacing(2) }}>
                          <CircularProgress variant="determinate" value={assessment.difficultyFactor * 100} thickness={8} color="secondary" size={"1.75rem"} />
                          <Typography>Trudność</Typography>
                        </Box>
                      </Box>
                    </Box>
                )}
              </Box>
            )) : (
              <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: theme.spacing(2), justifyContent: "center", alignItems: "center" }}>
                <SweatFaceIcon width={noLearningResultsIconSize} height={noLearningResultsIconSize} />
                <Heading variant="h6">Niczego nie znaleźliśmy</Heading>
                <Typography>Może to znak że pora na naukę?</Typography>
              </Box>
            )
        }
      </Grid>
      <Grid item xs={6} sx={{ display: "grid", gridTemplateRows: `0.8fr 1fr`, gap: theme.spacing(2) }}>
        <Box sx={{ flexGrow: 1 }}>
          <Heading variant="h2">? 🔥 dni nauki</Heading>
          <Typography>Tyle dni z rzędu wykonujesz już zadania. Pamiętaj że liczy się systematyczność!</Typography>
          <Typography variant="overline" color={"grey"}>Uwaga! Funkcjonalność streaków nie jest jeszcze gotowa </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: theme.spacing(2) }}>
          <Heading variant="h4">Twoja aktywność na wykresie</Heading>
          <LatestStudentActivityChart data={prepareLatestStudentActivityChartData()} />
        </Box>
      </Grid>
    </Grid>
  );
}


function EducatorProfileView() {
  return <>Not Implemented yet!</>
}


function ProfileSettingsView() {
  const theme = useTheme();

  const placeholderIconSize = "24rem";

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: theme.spacing(4), justifyContent: "center", alignItems: "center" }}>
      <DisappointedFaceIcon width={placeholderIconSize} height={placeholderIconSize} />
      <Heading variant="h3">Narazie nic tu nie ma</Heading>
    </Box>
  )
}