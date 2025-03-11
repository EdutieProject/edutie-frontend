import {useTheme} from "@mui/material";
import NavLayout from "src/views/common/NavLayout";
import React from "react";
import {navSections} from "src/features/navigation/navigationPath";

export default function HomeView() {
    const theme = useTheme();


    return (
        <NavLayout activeSectionIdOverride={navSections.home}>
            Hey there :)
        </NavLayout>
    );
}
