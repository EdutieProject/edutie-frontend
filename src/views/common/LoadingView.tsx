import {Box, CircularProgress, Typography, useTheme} from "@mui/material";
import NavLayout from "src/views/common/NavLayout";
import React, {useEffect, useState} from "react";


const learningFact = {
    values: [
        "Thank you for learning with us.",
        "Instead of saying, 'I'm not good at math,' adopt the mindset, 'I'm learning and can get better and better.'",
        "Before a study session, take a quick walk or do some light exercise. Movement during breaks (e.g., with the Pomodoro technique) also helps with memory retention.",
        "Instead of one long study session, try to learn regularly, for example, 20–30 minutes a day. Your brain retains material better when it's spaced out over time."
    ],
    getRandom: () =>  {
        return learningFact.values[Math.floor(Math.random() * learningFact.values.length)];
    }
}

/**
 *
 * @param {Object} params
 * @param {boolean} params.embedded embed loading view into a flex container
 * @returns
 */
export default function LoadingView({embedded, caption}: { embedded?: boolean; caption?: string }) {
    const theme = useTheme();
    const [headingFact, setHeadingFact] = useState("");

    if (embedded)
        return (
            <Box sx={{flexGrow: 1, display: "grid", placeItems: "center"}}>
                <CircularProgress thickness={5}/>
            </Box>
        );

    useEffect(() => {
        setTimeout(() => {
            setHeadingFact(learningFact.getRandom());
        }, 2000);
    }, []);

    return (
        <NavLayout variant={"none"}>
            <Box sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: theme.spacing(4),
                transform: "translateY(-10px)"
            }}>
                <Typography textAlign={"center"}>{headingFact}</Typography>
                <Box sx={{display: "grid", placeItems: "center"}}>
                    <CircularProgress thickness={5}/>
                </Box>
                <Typography variant={"overline"} textAlign={"center"} color={theme.palette.grey[400]}>
                    {caption ?? ""}
                </Typography>
            </Box>
        </NavLayout>
    );
}