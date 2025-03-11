import {Box, Button, Typography, useTheme} from "@mui/material";
import NavLayout from "src/views/common/NavLayout";
import React from "react";
import {navSections} from "src/features/navigation/navigationPath";

import logo from "src/assets/svg/logo.svg"
import {ArrowBack, RadioRounded} from "@mui/icons-material";

export default function CreateLearningSubjectView() {
    const theme = useTheme();


    return (
        <NavLayout activeSectionIdOverride={navSections.home}>
            <Box sx={{
                alignSelf: "stretch",
                padding: theme.spacing(1),
                display: "flex",
                gap: 2,
                justifyContent: "space-between",
                mb: {xs: 2, md: 1},
                position: "relative"
            }}>
                <Box>
                    <ArrowBack/>
                </Box>
                <Box sx={{display: "flex", gap: 2}}>
                    <Button color={"secondary"}>Sign in</Button>
                    <Button variant={"contained"} color={"secondary"}>Register</Button>
                </Box>
                <Box sx={{position: "absolute", width: "100%", top: 0, left: 0, display: "grid", placeItems: "center"}}>
                    <img src={logo} alt={""} height={"60px"}/>
                </Box>
            </Box>
            <Typography>See more</Typography>
        </NavLayout>
    );
}
