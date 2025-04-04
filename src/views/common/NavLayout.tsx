import {
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem, Typography,
    useTheme
} from "@mui/material";
import NavBar from "src/components/global/NavBar";
import React, {useEffect, useState} from "react";
import logo from "src/assets/svg/logo.svg";
import {Link} from "react-router";
import {navigationPath} from "src/features/navigation/navigationPath";
import {ArrowBack, Logout, PersonAdd, Settings} from "@mui/icons-material";
import {UserDetails} from "src/services/types";
import {getSavedUserDetails, saveUserDetails} from "src/features/storage/userDetailsCache";
import {getUserDetails} from "src/services/profile/userService";
import Tooltip from "@mui/material/Tooltip";

interface NavLayoutProps {
    disablePadding?: boolean;
    activeSectionIdOverride?: string;
    scroll?: boolean;
    relative?: boolean;
    variant: "home" | "view" | "none";
    backLink?: string;
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
    const [userDetails, setUserDetails] = useState<UserDetails | null>(getSavedUserDetails());

    async function loadUserDetails() {
        const response = await getUserDetails();
        if (!response.success) {
            console.warn("Could not get user details. Either user is anonymous or an error occured");
            return;
        }
        console.log()
        setUserDetails(response.data);
        saveUserDetails(response.data);
    }

    useEffect(() => {
        if (userDetails === null) {
            loadUserDetails().then();
        }
    }, []);

    const UserPanel = () => userDetails === null ?
        <>
            <Box sx={{display: "flex", gap: 2}}>
                <Button color={"secondary"}>Sign in</Button>
                <Button variant={"contained"} color={"secondary"}>Register</Button>
            </Box>
        </>
        :
        <>
            <AccountMenu userDetails={userDetails}/>
        </>

    console.log(userDetails);

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
                                <UserPanel/>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 4,
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: 2
                            }}>
                                <img src={logo} alt={""} width={"50%"}/>
                            </Box>
                        </>
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
                                <Link to={props.backLink ?? navigationPath.learnHome}>
                                    <ArrowBack sx={{color: "black"}}/>
                                </Link>
                            </Box>
                            <UserPanel/>
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

function AccountMenu({userDetails}: { userDetails: UserDetails }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ml: 2}}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{width: 32, height: 32}}>{userDetails.firstName[0]}</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small"/>
                    </ListItemIcon>
                    Account Settings
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}