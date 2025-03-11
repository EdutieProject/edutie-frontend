import * as React from "react";
import {useContext} from "react";
import {Box, IconButton, useTheme} from "@mui/material";
import {NavigateFunction, useNavigate} from "react-router";
import {
    SelectedNavigationSectionContext,
    SelectedNavigationSelectionContextType
} from "src/features/navigation/navigationState";
import {Add, Person, Search} from "@mui/icons-material";





// Define the types for NavBar props
interface NavBarProps {
    activeSectionIdOverride?: string | null;
}


export default function NavBar({activeSectionIdOverride}: NavBarProps) {
    const theme = useTheme();
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
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Search/>
                <label>
                    Learn
                </label>
            </div>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Add/>
                <label>
                    Create
                </label>
            </div>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Person/>
                <label>
                    You
                </label>
            </div>
        </Box>
    );
}
