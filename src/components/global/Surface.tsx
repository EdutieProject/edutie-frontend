import { Box, styled, useTheme, SxProps, Theme } from "@mui/material";
import React from "react";
import { ReactNode } from "react";

// Styled component using Material-UI's theme
const StyledBox = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[200],  // Use bracket notation for numbers
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

// Define the prop types for the Surface component
interface SurfaceProps {
  children?: ReactNode;             // Accepts any valid React child
  sx?: SxProps<Theme>;             // Optional custom styles using the sx prop
  onClick?: () => void;            // Optional onClick handler
}

export default function Surface({ children, sx, onClick }: SurfaceProps) {
  const theme = useTheme();
  return (
      <StyledBox sx={{ boxShadow: theme.shadows[2], ...sx }} onClick={onClick}>
        {children}
      </StyledBox>
  );
}
