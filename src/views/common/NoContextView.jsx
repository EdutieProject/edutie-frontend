import { Box, Typography, useTheme } from "@mui/material";
import NavLayout from "../layout/NavLayout";
import EyesIcon from "../../components/customIcons/EyesIcon";
import { navSections } from "../../features/navigation";


export default function NoContextView({ children, activeSectionId }) {
    const theme = useTheme();

    return (
        <NavLayout mode="flex" activeSectionId={activeSectionId} >
            <Box sx={{ flexGrow: 1, display: "grid", placeItems: "center", transform: "translateY(-25%)" }}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: theme.spacing(12) }}>
                    <EyesIcon height={"9rem"} width={"9rem"} />
                    <Box maxWidth={"36rem"}>
                        <Typography variant="h3" color="grey">Nie łapię kontekstu</Typography>
                        <Typography padding={"1em 0"} variant="body1" color="initial">{children}</Typography>
                    </Box>
                </Box>
            </Box>
        </NavLayout>
    );
}
