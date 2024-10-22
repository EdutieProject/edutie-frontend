import { Box, styled, useTheme } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  background: theme.palette.surface.main,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

/**
 * A surface-like component providing a rounded tile to encompass content.
 * @param {Object} props Component's props
 * @param {import("react").JSX.Element[]} props.children Component's children
 * @param {import("@mui/material").SxProps} props.sx custom styles
 * @returns React Component
 */
export default function Surface({ children, sx, onClick }) {
  const theme = useTheme();
  return (
    <StyledBox sx={{ boxShadow: theme.shadows[2], ...sx }} onClick={onClick}>
      {children}
    </StyledBox>
  );
}
