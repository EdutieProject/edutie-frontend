import { Box, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
    background: theme.palette.surface.main,
    padding: theme.spacing(2),
    borderRadius: 20,
}))

/**
 * A surface-like component providing a rounded tile to encompass content.
 * @param children Component's children 
 * @returns React Component
 */
export default function Surface({ children, sx }) {
    return (
        <StyledBox sx={{ boxShadow: 1, ...sx }}>
            {children}
        </StyledBox>
    );
}