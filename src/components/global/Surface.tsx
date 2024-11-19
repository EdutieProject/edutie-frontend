import {Box, SxProps, useTheme} from "@mui/material";
import React from "react";
import { ReactNode } from "react";

// Define the prop types for the Surface component
interface SurfaceProps {
  children?: ReactNode;             // Accepts any valid React child
  sx?: SxProps;                     // Optional custom styles using the sx prop
  onClick?: () => void;             // Optional onClick handler
}

export default function Surface({ children, sx, onClick }: SurfaceProps) {
  const theme = useTheme();
  return (
      <Box sx={{
        padding: theme.spacing(2),
        borderRadius: 1,
        background: theme.palette.surface.main,
        boxShadow: theme.shadows[1],
        ...sx }} onClick={onClick}>
        {children}
      </Box>
  );
}
