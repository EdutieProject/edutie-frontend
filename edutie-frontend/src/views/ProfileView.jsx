import { Box, CircularProgress, Divider, Grid, Typography, useTheme } from "@mui/material";
import NavLayout from "./layout/NavLayout";
import useEnumValue from "../hooks/alternative/useEnumValue";
import { useEffect, useState } from "react";
import RoundedButton from "../components/global/RoundedButton";
import Heading from "../components/global/Heading"
import { navSections } from "../features/navigation";
import { getStudentLatestLearningResults } from "../services/studentProfileService";
import LoadingView from "./common/LoadingView";
import ErrorView from "./common/ErrorView";
import SweatOutlinceFaceIcon from "../components/customIcons/SweatOutlineFaceIcon";

export default function ProfileView() {
  const theme = useTheme();
  const [error, setError] = useState();
  const Views = Object.freeze({ STUDENT: useEnumValue("STUDENT"), SETTINGS: useEnumValue("SETTINGS"), EDUCATOR: useEnumValue("EDUCATOR") });
  const [currentView, setCurrentView] = useState(Views.STUDENT);
  const viewDetails = currentView == Views.STUDENT ? "Profil ucznia" : currentView == Views.EDUCATOR ? "Profil edukatora" : "Ustawienia"

  if (error)
    return <ErrorView error={error} />

  return (
    <NavLayout activeSectionIdOverride={navSections.profile} mode="flex" scroll>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Heading variant='h3'>Szymon - twój profil</Heading>

          <Typography variant="body1">{viewDetails}</Typography>

        </Box>
        <Box sx={{ display: "flex", gap: theme.spacing(4), alignItems: "center" }}>
          <RoundedButton label={"Uczeń"} active={currentView == Views.STUDENT} onClick={() => setCurrentView(Views.STUDENT)} />
          {/* <RoundedButton label={"Edukator"} active={currentView == Views.EDUCATOR} onClick={() => setCurrentView(Views.EDUCATOR)} /> */}
          <RoundedButton label={"Ustawienia"} active={currentView == Views.SETTINGS} onClick={() => setCurrentView(Views.SETTINGS)} />
        </Box>
      </Box>
      {
        currentView === Views.STUDENT ? <StudentProfileView setError={setError} />
          : currentView === Views.EDUCATOR ? <EducatorProfileView />
            : <ProfileSettingsView />
      }
    </NavLayout>
  )
}


function StudentProfileView({ setError }) {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [learningResults, setLearningResults] = useState(null);

  useEffect(() => {
    getStudentLatestLearningResults().then(learningResultsResponse => {
      console.log(learningResultsResponse);
      setError(learningResultsResponse.error);
      setLearningResults(learningResultsResponse.data);
      setLoading(false);
    });
  }, [])

  const noLearningResultsIconSize = "12rem";

  if (loading)
    return (<LoadingView embedded />);

  return (
    <Grid container flexGrow={1} spacing={theme.spacing(4)} marginTop={theme.spacing(6)}>
      <Grid item xs={6} sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: theme.spacing(2) }}>
        <Heading variant="h4">Twoja ostatnia aktywność:</Heading>
        {
          learningResults.length > 0 ?
          learningResults.map(learningResult => (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: theme.spacing(2) }}>
              <Divider flexItem orientation="horizontal" sx={{ marginBottom: theme.spacing(2) }} />
              <Box sx={{ display: "flex", alignItems: "center", gap: theme.spacing(2) }}>
                <Heading variant="h5">Rezultat nauczania</Heading>
                <Typography color="grey" variant="caption">
                  {new Date(learningResult.createdOn).toLocaleDateString()}
                  {" "}
                  {new Date(learningResult.createdOn).toLocaleTimeString()}
                </Typography>
              </Box>

              {learningResult.assessments.map(assessment => {
                let learningReq = learningResult.learningResourceDefinition.learningRequirements.filter(o => o.id === assessment.learningRequirementId)[0];
                let qualifiedSubReqs = assessment.qualifiedSubRequirements.length;
                let allSubReqs = learningReq.subRequirements.length;
                return (
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography>{learningReq.name}</Typography>
                    <Box sx={{ display: "flex", gap: theme.spacing(4) }}>
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: theme.spacing(2) }}>
                        <CircularProgress variant="determinate" value={assessment.grade / 6 * 100} thickness={6} />
                        <Typography>Ocena: {assessment.grade}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: theme.spacing(2) }}>
                        <CircularProgress variant="determinate" value={qualifiedSubReqs / allSubReqs * 100} thickness={6} color="secondary" />
                        <Typography>Trudność</Typography>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          )) : (
            <Box sx={{flexGrow: 1, display: "flex", flexDirection: "column", gap: theme.spacing(2), justifyContent: "center", alignItems: "center"}}>
              <SweatOutlinceFaceIcon width={noLearningResultsIconSize} height={noLearningResultsIconSize}/>
              <Heading variant="h6">Niczego nie znaleźliśmy</Heading>
              <Typography>Może to znak że pora na naukę?</Typography>
            </Box>
          )
        }
      </Grid>
      <Grid item xs={6}>
        dupa
      </Grid>
    </Grid>
  );
}


function EducatorProfileView() {
  return <>Not Implemented yet!</>
}


function ProfileSettingsView() {
  return <></>
}