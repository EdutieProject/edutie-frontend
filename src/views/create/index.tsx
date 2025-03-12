import {Box, Button, Typography, useTheme} from "@mui/material";
import NavLayout from "src/views/common/NavLayout";
import React from "react";
import {navigationPath, navSections} from "src/features/navigation/navigationPath";

import logo from "src/assets/svg/logo.svg"
import {RadioRounded} from "@mui/icons-material";
import {useNavigate} from "react-router";

export default function CreateView() {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <NavLayout activeSectionIdOverride={navSections.home} variant={"home"}>
            <Box sx={{my: 8, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 4}}>
                <Box sx={{
                    p: 4,
                    display: "flex",
                    borderRadius: 1,
                    border: "1px solid lightgray",
                    gap: 2,
                    width: {xs: "100%", sm: "18rem"},
                    transition: "200ms ease",
                    "&:hover": {
                        boxShadow: theme.shadows[2],
                        transform: "translateY(-5px)"
                    }
                }} onClick={() => navigate(navigationPath.createLearningSubject)}>
                    <RadioRounded/>
                    <Box sx={{display: "flex", flexDirection: "column"}}>
                        <Typography variant={"h6"}>Learning Subject</Typography>
                        <Typography variant={"subtitle1"} color={"textSecondary"}>Create a learning subject with
                            requirements you can learn from.</Typography>
                    </Box>
                </Box>
                <Box sx={{
                    p: 4,
                    display: "flex",
                    borderRadius: 1,
                    border: "1px solid lightgray",
                    gap: 2,
                    width: "18rem"
                }}>
                    <RadioRounded/>
                    <Box sx={{display: "flex", flexDirection: "column"}}>
                        <Typography variant={"h6"}>Story</Typography>
                        <Typography variant={"subtitle1"} color={"textSecondary"}>Create a story - collection of lessons
                            curating a path for a learner.</Typography>
                    </Box>
                </Box>
            </Box>
            <Typography>Or let's see what you've created:</Typography>
            <Box sx={{my: 8, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 4}}>
                <Box sx={{
                    display: "flex",
                    gap: 2,
                    width: "18rem"
                }}>
                    <RadioRounded/>
                    <Box sx={{display: "flex", flexDirection: "column"}}>
                        <Typography variant={"h6"}>Blue banana</Typography>
                        <Typography variant={"subtitle1"} color={"textSecondary"}>Learning Subject</Typography>
                    </Box>
                </Box>
                <Box sx={{
                    display: "flex",
                    gap: 2,
                    width: "18rem"
                }}>
                    <RadioRounded/>
                    <Box sx={{display: "flex", flexDirection: "column"}}>
                        <Typography variant={"h6"}>An amazing story</Typography>
                        <Typography variant={"subtitle1"} color={"textSecondary"}>Story in mathematics</Typography>
                    </Box>
                </Box>
                <Box sx={{
                    display: "flex",
                    gap: 2,
                    width: "18rem"
                }}>
                    <RadioRounded/>
                    <Box sx={{display: "flex", flexDirection: "column"}}>
                        <Typography variant={"h6"}>An amazing story</Typography>
                        <Typography variant={"subtitle1"} color={"textSecondary"}>Story in mathematics</Typography>
                    </Box>
                </Box>
            </Box>
            <Typography>See more</Typography>
        </NavLayout>
    );
}
