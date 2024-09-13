import { Box, Typography } from "@mui/material";
import NavLayout from "./layout/NavLayout";
import useEnumValue from "../hooks/alternative/useEnumValue";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import RoundedButton from "../components/global/RoundedButton";
import { navSections } from "../features/navigation";

export default function ProfileView() {
  const theme = useTheme();
  const Views = Object.freeze({ STUDENT: useEnumValue("STUDENT"), SETTINGS: useEnumValue("SETTINGS"), EDUCATOR: useEnumValue("EDUCATOR") });
  const [currentView, setCurrentView] = useState(Views.STUDENT);
  const viewDetails = currentView == Views.STUDENT ? "Profil ucznia" : currentView == Views.EDUCATOR ? "Profil edukatora" : "Ustawienia"

  return (
    <NavLayout activeSectionIdOverride={navSections.profile}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography fontFamily={"Baloo"} variant='h3'>Szymon - twój profil</Typography>

          <Typography variant="body1">{viewDetails}</Typography>

        </Box>
        <Box sx={{ display: "flex", gap: theme.spacing(4), alignItems: "center" }}>
          <RoundedButton label={"Uczeń"} active={currentView == Views.STUDENT} onClick={() => setCurrentView(Views.STUDENT)} />
          <RoundedButton label={"Edukator"} active={currentView == Views.EDUCATOR} onClick={() => setCurrentView(Views.EDUCATOR)} />
          <RoundedButton label={"Ustawienia"} active={currentView == Views.SETTINGS} onClick={() => setCurrentView(Views.SETTINGS)} />
        </Box>
      </Box>
      {
        currentView === Views.STUDENT ? <StudentProfileView />
          : currentView === Views.EDUCATOR ? <EducatorProfileView />
            : <ProfileSettingsView />
      }
    </NavLayout>
  )
}


function StudentProfileView() {
  return <></>
}


function EducatorProfileView() {
  return <></>
}


function ProfileSettingsView() {
  return <></>
}