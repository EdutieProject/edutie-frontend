import {Box, CircularProgress, Typography, useTheme} from "@mui/material";
import NavLayout from "../layout/NavLayout";
import React, {useEffect, useState} from "react";


const learningFact = {
    values: [
        "Dziękujemy że uczysz się razem z nami.",
        "Zamiast mówić sobie: „Nie jestem dobry w matematyce”, przyjmij podejście „Uczę się i mogę być coraz lepszy”.",
        "Przed sesją nauki zrób szybki spacer lub wykonaj lekkie ćwiczenia. Ruch w przerwach (np. przy technice Pomodoro) też dobrze wpływa na zapamiętywanie.",
        "Zamiast jednej długiej sesji, staraj się uczyć regularnie, np. codziennie przez 20–30 minut. Twój mózg lepiej zapamiętuje materiał rozłożony w czasie."
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
        <NavLayout>
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
                <Typography variant={"overline"} color={theme.palette.grey[400]}>
                    {caption ?? ""}
                </Typography>
            </Box>
        </NavLayout>
    );
}