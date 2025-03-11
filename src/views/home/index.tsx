import {Autocomplete, Box, TextField, useTheme} from "@mui/material";
import NavLayout from "src/views/common/NavLayout";
import React from "react";
import {navSections} from "src/features/navigation/navigationPath";

import logo from "src/assets/svg/logo.svg"

export default function HomeView() {
    const theme = useTheme();


    return (
        <NavLayout activeSectionIdOverride={navSections.home}>
            <Box sx={{alignSelf: "stretch", padding: theme.spacing(1), display: "flex", justifyContent: "flex-end"}}>
                user panel
            </Box>
            <Box sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <img src={logo} alt={""} width={"80%"}/>
                <Autocomplete
                    disablePortal
                    options={[]}
                    sx={{width: 350}}
                    renderInput={(params) => <TextField {...params} label="Search learning subjects"/>}
                />
                <Box sx={{py: 10}}>
                    {/* Spacer */}
                </Box>
            </Box>

        </NavLayout>
    );
}
