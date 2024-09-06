import * as React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { navElements, SelectedNavigationSectionContext } from "../../features/navigation";


function NavElement({ item, isActive, setActiveNavbarElem }) {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{
      paddingX: theme.spacing(4),
      paddingY: theme.spacing(2),
      position: "relative"
    }}>
      <Box sx={{
        position: "absolute",
        top: 0, left: 0, width: "100%", height: "100%",
        backgroundColor: isActive ? theme.palette.common.white : "transparent",
        boxShadow: isActive ? theme.shadows[3] : "none",
        borderRadius: 2,
        transform: "scaleX(1.08)"
      }}
      />
      <IconButton
        onClick={() => {
          console.log("setting active navbar elem: " + item.id); 
          setActiveNavbarElem(item.id); 
          item.navigate(navigate);
        }}
        disableRipple
        disableFocusRipple
      >
        {item.icon(isActive ? theme.palette.primary.main : theme.palette.common.white)}
      </IconButton>
    </Box>
  );
}

export default function NavBar({ activeSectionIdOverride }) {
  const theme = useTheme();
  
  const { selectedSectionId, setSelectedSectionId } = React.useContext(SelectedNavigationSectionContext);

  console.log("selectedSectionId: " + selectedSectionId);

  React.useEffect(() => {
    if (activeSectionIdOverride == null)
      return;
    setSelectedSectionId(activeSectionIdOverride);
  }, [activeSectionIdOverride])

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.primary.main,
      gap: theme.spacing(2),
      boxShadow: theme.shadows[4],
      paddingY: theme.spacing(4)
    }}>
      {navElements.map((item, idx) => (
        <NavElement
          key={idx}
          item={item}
          isActive={item.id === selectedSectionId}
          setActiveNavbarElem={setSelectedSectionId}
        />
      ))}
    </Box>
  );
}
