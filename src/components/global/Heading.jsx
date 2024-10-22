import { Typography } from "@mui/material";

/**
 * Wrapper for ehnanced font usage
 * @param {Object} params
 * @param {string} params.variant variant
 * @param {import("@mui/material").SxProps} params.sx style overrides
 * @returns 
 */
export default function Heading({ variant, children, sx}) {
    return <Typography fontFamily={"Baloo"} variant={variant} sx={sx}>{ children }</Typography>
}