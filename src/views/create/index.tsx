import {Autocomplete, Box, Button, TextField, useTheme} from "@mui/material";
import NavLayout from "src/views/common/NavLayout";
import React from "react";
import {navSections} from "src/features/navigation/navigationPath";

import logo from "src/assets/svg/logo.svg"

export default function CreateView() {
    const theme = useTheme();


    return (
        <NavLayout activeSectionIdOverride={navSections.home}>
            <Box sx={{alignSelf: "stretch", padding: theme.spacing(1), display: "flex", gap: 2, justifyContent: "flex-end", mb: {xs: 2, md: 1}}}>
                <Button color={"secondary"}>Sign in</Button>
                <Button variant={"contained"} color={"secondary"}>Register</Button>
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <img src={logo} alt={""} width={"60%"}/>
            </Box>
            <Box>
                Here goes the content
            </Box>
        </NavLayout>
    );
}
