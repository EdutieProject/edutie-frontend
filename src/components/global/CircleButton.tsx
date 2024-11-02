import {Box, ButtonBase, PaletteColor, SxProps, Theme, useTheme} from "@mui/material";
import React, {ReactNode} from "react";

// Define the interface for the props
interface CircleButtonProps {
    size?: number | string;        // Size can be a number or string
    bgColor?: PaletteColor;             // bgColor should be an object with main and dark colors
    onClick?: () => void;          // onClick is an optional function
    children?: ReactNode;          // children can be any valid React node
    shadow?: boolean;              // shadow is a boolean
    sx?: SxProps<Theme>;
}

export default function CircleButton({
                                         size,
                                         bgColor,
                                         onClick,
                                         children,
                                         shadow,
                                         sx
                                     }: CircleButtonProps) {
    const theme: Theme = useTheme();

    // Set default values if not provided
    size = size ? size : theme.spacing(2);
    bgColor = bgColor ? bgColor : theme.palette.primary;

    return (
        <ButtonBase
            sx={{
                padding: size,
                borderRadius: 1,  // Adjusted from theme.shape.roundedRadius to theme.shape.borderRadius (as "roundedRadius" is not a default in MUI)
                backgroundColor: bgColor.main,
                position: "relative",
                boxShadow: shadow ? theme.shadows[2] : "none",
                ":hover": {backgroundColor: bgColor.dark},
                transition: "ease 200ms",
                ...sx
            }}
            onClick={onClick}
        >
            <Box
                sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: 0,
                    left: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {children}
            </Box>
        </ButtonBase>
    );
}
