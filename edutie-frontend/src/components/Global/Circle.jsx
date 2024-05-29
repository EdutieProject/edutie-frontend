import { Avatar } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export default function Circle(props) {
  return (
    <Avatar
      sx={{
        backgroundColor: "#4CAF50",
        fontSize: "3rem",
        width: props.size,
        height: props.size,
      }}
    >
      <CheckCircleIcon />
    </Avatar>
  );
}
