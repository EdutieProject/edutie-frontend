import * as React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { setNavElement } from "../../features/redux/navigation/navigationSlice";
import { useNavigate } from "react-router-dom";
import DistributedLearningIcon from "../customIcons/DistributedLearningIcon";
import { navElements, navigationPath } from "../../config/navigation";
import { AndroidOutlined, MenuBook } from "@mui/icons-material";

//TODO: how about merging this into the navbar component ?
function NavElement({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const activeNavElement = useSelector((state) => state.navigation.activeID);

  const press = (selectedItem) => {
    console.log("button pressed", selectedItem.id);
    dispatch(setNavElement(selectedItem.id));
    navigate(selectedItem.href);
  };

  return (
    <IconButton
      onClick={() => press(item)}
      sx={{
        backgroundColor:
          activeNavElement == item.id
            ? theme.palette.common.white
            : "transparent",
        color:
          activeNavElement == item.id
            ? theme.palette.primary.main
            : theme.palette.common.white,
        transform: "scale(1.3)",
      }}
      disableRipple
      disableFocusRipple
    >
      {item.icon}
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
