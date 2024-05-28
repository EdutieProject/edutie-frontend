import { ButtonBase, Typography, useTheme } from "@mui/material";


export default function RoundedButton({label, active = false}) {
    const theme = useTheme();
    return (
        <ButtonBase
        sx={{
            borderRadius: 20,
            color: active ? theme.palette.common.white : theme.palette.common.black,
            backgroundColor: active ? theme.palette.primary.main : theme.palette.common.white,
            textTransform: "none",
            paddingY: theme.spacing(1),
            paddingX: theme.spacing(3),
            boxShadow: active ? 2 : 0,
            letterSpacing: 2,
            "&:hover": {
                backgroundColor: active ? theme.palette.primary.dark : theme.palette.grey[200]
            },
            transition: "ease 200ms"
        }}>
            <Typography variant="h6" fontFamily={"Baloo"}>{label}</Typography>
        </ButtonBase>
    );
}