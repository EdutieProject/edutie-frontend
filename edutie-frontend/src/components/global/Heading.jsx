import { Typography } from "@mui/material";

/**
 * Wrapper for ehnanced font usage
 * @param {Object} params
 * @param {string} params.variant variant
 * @returns 
 */
export default function Heading({ variant, children }) {
    return <Typography fontFamily={"Baloo"} variant={variant}>{ children }</Typography>
}