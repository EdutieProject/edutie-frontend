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

  return (
    <IconButton
      onClick={() => press(item)}
      disableRipple
      disableFocusRipple
    >
      {item.icon(activeNavElement === item.id ? theme.palette.primary.main : theme.palette.common.white)}
    </IconButton>
  );
}

export default function NavBar() {
  const theme = useTheme();

  const styles = {
    navBox: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.primary.main,
      gap: theme.spacing(4),
      padding: theme.spacing(4),
      boxShadow: theme.shadows[4],
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
