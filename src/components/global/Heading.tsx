import { Typography } from "@mui/material";
import { TypographyProps, SxProps, Theme } from "@mui/material";
import React from "react";

// Define the interface for the props
interface HeadingProps extends TypographyProps {
    sx?: SxProps<Theme>;   // Optional style overrides using the SxProps type
}

export default function Heading({ variant, children, sx }: HeadingProps) {
    return (
        <Typography fontFamily={"Baloo"} variant={variant} sx={sx}>
            {children}
        </Typography>
    );
}
