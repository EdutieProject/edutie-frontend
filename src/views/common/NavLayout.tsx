import { useTheme, Container, Box } from "@mui/material";
import NavBar from "../../components/global/NavBar";
import React from "react";

interface NavLayoutProps {
    disablePadding?: boolean;
    activeSectionIdOverride?: string;
    scroll?: boolean;
    relative?: boolean;
}

/**
 * Default application layout providing navigation bar
 * @param props parameters
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
                    flexDirection: "column",
                    justifyItems: "stretch",
                    height: "100vh"
                }}
            >
                <Box sx={{
                    flexGrow: 1,
                    paddingY: props.disablePadding ? 0 : theme.spacing(2),
                    paddingX: props.disablePadding ? 0 : theme.spacing(2),
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    overflowY: "scroll",
                    position: props.relative ? "relative" : "static"
                }}>
                    {props.children}
                </Box>
                <NavBar activeSectionIdOverride={props.activeSectionIdOverride}/>
            </Container>
    );
}