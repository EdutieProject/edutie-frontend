import { Box, CircularProgress } from "@mui/material";
import NavLayout from "../layout/NavLayout";
import React from "react";

/**
 * 
 * @param {Object} params
 * @param {Array} params.children Children nodes - those are not displayed, only for rendering purposes. 
 * @param {boolean} params.embedded embed loading view into a flex container
 * @returns 
 */
export default function LoadingView({ children, embedded }: { children?: React.ReactNode; embedded?: boolean; }) {

    if (embedded)
        return (
        <Box sx={{ flexGrow: 1, display: "grid", placeItems: "center" }}>
            <CircularProgress thickness={5} />
        </Box>
        );

    return (
        <NavLayout mode={"flex"}>
            <Box sx={{ flexGrow: 1, display: "grid", placeItems: "center" }}>
                <CircularProgress thickness={5} />
            </Box>
            <Box sx={{ display: "none" }}>{children}</Box>
        </NavLayout>
    );
}