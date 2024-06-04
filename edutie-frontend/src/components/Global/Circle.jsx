import { Avatar } from "@mui/material";
export default function Circle(props) {
  return (
    <Avatar
      sx={{
        backgroundColor: "#4CAF50",
        width: props.size,
        height: props.size,
      }}
      onClick={props.onClick}
    >
      {props.children}
    </Avatar>
  );
}
