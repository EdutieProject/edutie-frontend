import { useTheme, Container, Box } from "@mui/material";
import NavBar from "../../components/global/NavBar.js";
import { navSections } from "../../features/navigation.js";
import { useState } from "react";

/**
 * Default application layout providing navigation bar
 * @param {Object} params parameters
 * @param {string} params.mode "flex" if you want the inside box to be flex container
 * @param {boolean} params.disablePadding whether to disable padding for the inside box
 * @param {string} params.activeSectionIdOverride active section Id - overriding the active elem in the navbar
 * @param {boolean} params.scroll whether internal container should be scrollable
 * @param {boolean} params.relative whether the internal box should have relative position
 * @returns 
 */
export default function NavLayout({ children, mode, disablePadding, activeSectionIdOverride, scroll, relative}) {
    const theme = useTheme();

    return (
            <Container
                maxWidth={false}
                disableGutters
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyItems: "stretch",
                    height: "100vh"
                }}
            >
                <NavBar activeSectionIdOverride={activeSectionIdOverride}/>
                <Box sx={{
                    flexGrow: 1,
                    padding: disablePadding ? 0 : theme.spacing(8),
                    paddingX: disablePadding ? 0 : theme.spacing(16),
                    display: mode == "flex" ? "flex" : "block",
                    flexDirection: "column",
                    overflowY: scroll ? "scroll" : "hidden",
                    position: relative ? "relative" : "static"
                }}>
                    {children}
                </Box>
            </Container>
    );
}