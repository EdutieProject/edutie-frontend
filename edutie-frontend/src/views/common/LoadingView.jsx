import { Box, CircularProgress } from "@mui/material";
import NavLayout from "../layout/NavLayout";

/**
 * 
 * @param {Object} params
 * @param {Array} params.children Children nodes - those are not displayed, only for rendering purposes. 
 * @returns 
 */
export default function LoadingView({ children }) {

    return (
        <NavLayout mode={"flex"}>
            <Box sx={{ flexGrow: 1, display: "grid", placeItems: "center" }}>
                <CircularProgress thickness={5}/>
            </Box>
            <Box sx={{display: "none"}}>{ children }</Box>
        </NavLayout>
    );
}