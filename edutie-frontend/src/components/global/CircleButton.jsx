import { Box, ButtonBase, useTheme } from "@mui/material";


export default function CircleButton({ size, bgColor, onClick, children }) {
    const theme = useTheme();
    size = size ? size : theme.spacing(2);
    bgColor = bgColor ? bgColor : theme.palette.primary;
    return (
        <ButtonBase sx={{
            padding: size, 
            borderRadius: "50%", 
            backgroundColor: bgColor.main,
            position: "relative",
            boxShadow: theme.shadows[4],
            ":hover": { backgroundColor: bgColor.dark },
            transition: "ease 200ms"
            }}
        onClick={onClick}>
            <Box sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                { children }
            </Box>
        </ButtonBase>
    );
}