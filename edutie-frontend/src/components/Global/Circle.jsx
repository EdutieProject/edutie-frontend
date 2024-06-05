import { Avatar, useTheme } from "@mui/material";
export default function Circle(props) {
  const theme = useTheme();
  return (
    <Avatar
      sx={{
        backgroundColor: "#4CAF50",
        width: props.size,
        height: props.size,
        boxShadow: theme.shadows[4],
        cursor: "pointer",
      }}
      onClick={props.onClick}
    >
      {props.children}
    </Avatar>
  );
}
