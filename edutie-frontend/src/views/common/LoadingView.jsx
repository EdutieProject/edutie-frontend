import { Box, CircularProgress } from "@mui/material";
import NavLayout from "../layout/NavLayout";



export default function LoadingView() {

    return (
        <NavLayout mode={"flex"}>
            <Box sx={{ flexGrow: 1, display: "grid", placeItems: "center" }}>
                <CircularProgress thickness={5}/>
            </Box>
        </NavLayout>
    );
}