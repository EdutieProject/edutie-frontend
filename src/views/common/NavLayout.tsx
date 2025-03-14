import {Box, Button, Container, useTheme} from "@mui/material";
import NavBar from "src/components/global/NavBar";
import React from "react";
import logo from "src/assets/svg/logo.svg";
import {Link} from "react-router";
import {navigationPath} from "src/features/navigation/navigationPath";
import {ArrowBack} from "@mui/icons-material";

interface NavLayoutProps {
    disablePadding?: boolean;
    activeSectionIdOverride?: string;
    scroll?: boolean;
    relative?: boolean;
    variant: "home" | "searchHome" | "view" | "none"
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
                {
                    props.variant === "home" ? (
                        <>
                            <Box sx={{
                                alignSelf: "stretch",
                                padding: theme.spacing(1),
                                display: "flex",
                                gap: 2,
                                justifyContent: "flex-end",
                                mb: {xs: 2, md: 1}
                            }}>
                                <Button color={"secondary"}>Sign in</Button>
                                <Button variant={"contained"} color={"secondary"}>Register</Button>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 4,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <img src={logo} alt={""} width={"50%"}/>
                            </Box>
                        </>
                    ) : props.variant === "searchHome" ? (
                        <Box sx={{
                            alignSelf: "stretch",
                            padding: theme.spacing(1),
                            display: "flex",
                            gap: 2,
                            justifyContent: "flex-end"
                        }}>
                            <Button color={"secondary"}>Sign in</Button>
                            <Button variant={"contained"} color={"secondary"}>Register</Button>
                        </Box>
                    ) : props.variant === "view" ? (
                        <Box sx={{
                            alignSelf: "stretch",
                            padding: theme.spacing(1),
                            display: "flex",
                            gap: 2,
                            justifyContent: "space-between",
                            mb: 2,
                            position: "relative"
                        }}>
                            <Box sx={{display: "grid", placeItems: "center"}}>
                                <Link to={navigationPath.create}>
                                    <ArrowBack sx={{color: "black"}}/>
                                </Link>
                            </Box>
                            <Box sx={{display: "flex", gap: 2}}>
                                <Button color={"secondary"}>Sign in</Button>
                                <Button variant={"contained"} color={"secondary"}>Register</Button>
                            </Box>
                            <Box sx={{
                                position: "absolute",
                                width: "100%",
                                top: 0,
                                left: {xs: "-20%", md: 0},
                                display: "grid",
                                placeItems: "center",
                                zIndex: "-1"
                            }}>
                                <img src={logo} alt={""} height={"45"}/>
                            </Box>
                        </Box>
                    ) : (<></>)
                }
                {props.children}
            </Box>
            <NavBar activeSectionIdOverride={props.activeSectionIdOverride}/>
        </Container>
    );
}