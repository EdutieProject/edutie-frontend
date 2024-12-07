import * as React from "react";
import {useContext} from "react";
import {Box, IconButton, useTheme} from "@mui/material";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {navElements} from "../../features/navigation/navigationPath";
import {
    SelectedNavigationSectionContext,
    SelectedNavigationSelectionContextType
} from "../../features/navigation/navigationState";
import {Logout} from "@mui/icons-material";



// Define the types for NavElement props
interface NavElementProps {
    item: {
        id: string;
        icon: (color: string) => JSX.Element;
        navigate: (navigate: NavigateFunction) => void;
    };
    isActive: boolean;
    setActiveNavbarElem: (id: string) => void;
}

function NavElement({item, isActive, setActiveNavbarElem}: NavElementProps) {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box sx={{
            paddingX: theme.spacing(4),
            paddingY: theme.spacing(1),
            position: "relative"
        }}>
            <Box sx={{
                position: "absolute",
                top: 0, left: 0, width: "100%", height: "100%",
                backgroundColor: isActive ? theme.palette.common.white : "transparent",
                boxShadow: isActive ? theme.shadows[3] : "none",
                borderRadius: 1,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                transform: "scaleX(1.08)"
            }}
            />
            <IconButton
                onClick={() => {
                    setActiveNavbarElem(item.id);
                    item.navigate(navigate);
                }}
                disableRipple
                disableFocusRipple
                sx={{
                    padding: theme.spacing(2),
                    transition: "200ms ease",
                    "&:hover": {
                        backgroundColor:  isActive ? "inherit" : theme.palette.primary.light,
                    }
                }}
            >
                {item.icon(isActive ? theme.palette.primary.main : theme.palette.common.white)}
            </IconButton>
        </Box>
    );
}

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

    async function logout() {
        const response = await fetch(window.location.protocol + "//" + import.meta.env.VITE_BACKEND_HOST + "/logout",
            { method: "POST", credentials: "include" });
        console.log(response)
        if (response.ok) {
            window.location.href = window.location.origin + import.meta.env.VITE_BASE_PATH_OVERRIDE;
        }
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: theme.palette.primary.main,
            boxShadow: theme.shadows[4],
            paddingY: theme.spacing(6)
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing(2)
            }}>
                {navElements.map((item, idx) => (
                    <NavElement
                        key={idx}
                        item={item}
                        isActive={item.id === selectedSectionId}
                        setActiveNavbarElem={setSelectedSectionId}
                    />
                ))}
            </Box>
            <Box>
                <NavElement item={{
                    id: "logout",
                    icon: (color) => <Logout/>,
                    navigate: (navigate) => { logout().then() }
                }} isActive={false} setActiveNavbarElem={() => {}}/>
            </Box>
        </Box>
    );
}
