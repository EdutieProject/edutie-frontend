import * as React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setNavElement } from "../../features/redux/navigation/navigationSlice";
import { useNavigate } from "react-router-dom";
import { navElements } from "../../config/navigation";

//TODO: refactor & improve redux
function NavElement({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const activeNavElement = useSelector((state) => state.navigation.activeID);

  const press = (selectedItem) => {
    console.log("Navigation button pressed", selectedItem.id);
    dispatch(setNavElement(selectedItem.id));
    navigate(selectedItem.href);
  };

  let isActive = activeNavElement === item.id;

  return (
    <Box sx={{
      paddingX: theme.spacing(4),
      paddingY: theme.spacing(2),
      backgroundColor: isActive ? theme.palette.common.white : "transparent",
      boxShadow: isActive ? theme.shadows[3] : "none",
      borderRadius: 2,
      transform: "scaleX(1.1)"
      }}>
      <IconButton
        onClick={() => press(item)}
        disableRipple
        disableFocusRipple
      >
        {item.icon(isActive ? theme.palette.primary.main : theme.palette.common.white)}
      </IconButton>
    </Box>
  );
}

export default function NavBar() {
  const theme = useTheme();

  const styles = {
    navBox: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.primary.main,
      gap: theme.spacing(2),
      boxShadow: theme.shadows[4],
      paddingY: theme.spacing(4)
    },
    wrapperBox: {
      display: "flex",
      padding: theme.spacing(4),
    },
  };

  return (
    <Box sx={styles.navBox}>
      {navElements.map((item) => (
        <NavElement key={item.id} item={item} />
      ))}
    </Box>
  );
}
