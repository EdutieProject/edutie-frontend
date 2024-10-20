import { ButtonBase, Typography, useTheme } from "@mui/material";

/**
 * Rounded button component
 * @param {Object} params
 * @param {string} params.label
 * @param {boolean} params.active
 * @param {() => void} params.onClick
 * @param {import("@mui/material").Shadows} params.shadow
 * @param {boolean} params.disabled
 * @param {import("@mui/material").SxProps} params.sx
 * @returns JSX element
 */
export default function RoundedButton({label, active = false, onClick, shadow, disabled, sx}) {
    const theme = useTheme();
    return (
        <ButtonBase
        sx={{
            borderRadius: 20,
            color: active ? theme.palette.common.white : theme.palette.common.black,
            backgroundColor: disabled && active ? theme.palette.primary.light :active ? theme.palette.primary.main : theme.palette.common.white,
            textTransform: "none",
            paddingY: theme.spacing(1),
            paddingX: theme.spacing(3),
            boxShadow: shadow ? theme.shadows[2] : 0,
            letterSpacing: 2,
            "&:hover": {
                backgroundColor: active ? theme.palette.primary.dark : theme.palette.grey[200]
            },
            transition: "ease 200ms",
            cursor: disabled ? "not-allowed !important" : "pointer",
            flexShrink: 0,
            ...sx
        }} 
        disabled={disabled}
        onClick={onClick}>
            <Typography variant="h6" fontFamily={"Baloo"}>{label}</Typography>
        </ButtonBase>
    );
}