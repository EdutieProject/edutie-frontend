import { Typography } from "@mui/material";

/**
 * 
 * @param {params} param
 * @param {params.variant: string} heading variant
 * @returns 
 */
export default function Heading({ variant, children }) {
    return <Typography fontFamily={"Baloo"} variant={variant}>{ children }</Typography>
}