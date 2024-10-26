import { useTheme, Container, Box } from "@mui/material";
import NavBar from "../../components/global/NavBar";
import React from "react";

interface NavLayoutProps {
    mode?: string;
    disablePadding?: boolean;
    activeSectionIdOverride?: string;
    scroll?: boolean;
    relative?: boolean;
}

/**
 * Default application layout providing navigation bar
 * @param props parameters
 * @param props.mode "flex" if you want the inside box to be flex container
 * @param props.disablePadding whether to disable padding for the inside box
 * @param props.activeSectionIdOverride active section Id - overriding the active elem in the navbar
 * @param props.scroll whether internal container should be scrollable
 * @param props.relative whether the internal box should have relative position
 * @returns 
 */
export default function NavLayout(props: React.PropsWithChildren<NavLayoutProps>) {
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
                <NavBar activeSectionIdOverride={props.activeSectionIdOverride}/>
                <Box sx={{
                    flexGrow: 1,
                    padding: props.disablePadding ? 0 : theme.spacing(8),
                    paddingX: props.disablePadding ? 0 : theme.spacing(16),
                    display: props.mode === "flex" ? "flex" : "block",
                    flexDirection: "column",
                    overflowY: props.scroll ? "scroll" : "hidden",
                    position: props.relative ? "relative" : "static"
                }}>
                    {props.children}
                </Box>
            </Container>
    );
}