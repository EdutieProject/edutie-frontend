import {Autocomplete, Box, Button, TextField, useTheme} from "@mui/material";
import NavLayout from "src/views/common/NavLayout";
import React from "react";
import {navSections} from "src/features/navigation/navigationPath";

import logo from "src/assets/svg/logo.svg"

export default function HomeView() {
    const theme = useTheme();


    return (
        <NavLayout activeSectionIdOverride={navSections.home} variant={"searchHome"}>
            <Box sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                gap: 4,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <img src={logo} alt={""} width={"100%"}/>
                <Autocomplete
                    disablePortal
                    options={[
                        { label: 'The Shawshank Redemption', year: 1994 },
                        { label: 'The Godfather', year: 1972 },
                        { label: 'The Godfather: Part II', year: 1974 },
                        { label: 'The Dark Knight', year: 2008 },
                        { label: '12 Angry Men', year: 1957 },
                    ]}
                    sx={{width: {xs: "100%", md: "80%"}}}
                    renderInput={(params) => <TextField {...params} label="What would you like to learn?"/>}
                />
                <Box sx={{py: 12}}>
                    {/* Spacer */}
                </Box>
            </Box>

        </NavLayout>
    );
}
