import {ButtonBase, SxProps, Theme, Typography, useTheme} from "@mui/material";
import React from "react";

// Define the prop types for the RoundedButton component
interface RoundedButtonProps {
    label: string;                  // Button label text
    active?: boolean;               // Determines if the button is active
    onClick?: () => void;           // Click event handler
    shadow?: boolean;               // Determines if the button has a shadow
    disabled?: boolean;             // Determines if the button is disabled
    sx?: SxProps<Theme>;            // Optional custom styles
}

//TODO: Rounded button refactoring

export default function RoundedButton({
                                          label,
                                          active = false,
                                          onClick,
                                          shadow,
                                          disabled,
                                          sx,
                                      }: RoundedButtonProps) {
    const theme = useTheme();
    return (
        <ButtonBase
            sx={{
                borderRadius: 1,
                color: active ? theme.palette.common.white : theme.palette.common.black,
                backgroundColor: disabled && active
                    ? theme.palette.primary.light
                    : active
                        ? theme.palette.primary.main
                        : theme.palette.common.white,
                textTransform: "none",
                paddingY: theme.spacing(1),
                paddingX: theme.spacing(3),
                boxShadow: shadow ? theme.shadows[2] : 0,
                letterSpacing: 2,
                "&:hover": {
                    backgroundColor: active ? theme.palette.primary.dark : theme.palette.grey[200],
                },
                "&:disabled": {
                    "&:hover": {
                        backgroundColor: theme.palette.common.white,
                    },
                    cursor: "not-allowed",
                    pointerEvents: "all !important",
                },
                transition: "ease 200ms",
                cursor: disabled ? "not-allowed !important" : "pointer",
                flexShrink: 0,
                ...sx,
            }}
            disabled={disabled}
            onClick={onClick}
        >
            <Typography variant="h6" fontFamily={"Baloo"}>
                {label}
            </Typography>
        </ButtonBase>
    );
}
