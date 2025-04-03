import * as React from "react";
import {useContext} from "react";
import {Box, useTheme} from "@mui/material";
import {
    SelectedNavigationSectionContext,
    SelectedNavigationSelectionContextType
} from "src/features/navigation/navigationState";
import {Add, Person, Search} from "@mui/icons-material";
import {useNavigate} from "react-router";
import * as path from "node:path";
import {navigationPath} from "src/features/navigation/navigationPath";


// Define the types for NavBar props
interface NavBarProps {
    activeSectionIdOverride?: string | null;
}


export default function NavBar({activeSectionIdOverride}: NavBarProps) {
    const theme = useTheme();
    const navigate = useNavigate();
    const {
        selectedSectionId,
        setSelectedSectionId
    } = useContext<SelectedNavigationSelectionContextType>(SelectedNavigationSectionContext);

    React.useEffect(() => {
        if (activeSectionIdOverride != null) {
            setSelectedSectionId(activeSectionIdOverride);
        }
    }, [activeSectionIdOverride]);


    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 2,
            mb: 1
        }}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}
                onClick={() => navigate(navigationPath.learnHome)}
            >
                <Search/>
                <label>
                    Learn
                </label>
            </div>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}
                onClick={() => navigate(navigationPath.createHome)}
            >
                <Add/>
                <label>
                    Create
                </label>
            </div>
            {/*<div style={{display: "flex", flexDirection: "column", alignItems: "center"}}*/}
            {/*     onClick={() => navigate(navigationPath.account)}*/}
            {/*>*/}
            {/*    <Person/>*/}
            {/*    <label>*/}
            {/*        You*/}
            {/*    </label>*/}
            {/*</div>*/}
        </Box>
    );
}
