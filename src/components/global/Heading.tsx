import {Typography, TypographyProps} from "@mui/material";
import React from "react";
import {SxProps} from "@mui/system";

// Define the interface for the props
interface HeadingProps extends TypographyProps {
    sx?: SxProps;   // Optional style overrides using the SxProps type
}

export default function Heading({ variant, children, sx }: HeadingProps) {
    return (
        <Typography fontFamily={"Baloo"} variant={variant} sx={sx}>
            {children}
        </Typography>
    );
}
