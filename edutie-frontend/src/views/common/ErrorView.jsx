import { Box, IconButton, SvgIcon, Typography, useTheme } from "@mui/material";
import NavLayout from "../layout/NavLayout";
import { useState } from "react";
import Surface from "../../components/global/Surface";
import { Link } from "react-router-dom";
import SadRoundSquareIcon from "../../components/customIcons/SadRoundSqaureIcon";


export default function ErrorView({ error }) {
    const theme = useTheme();
    const [showDetails, setShowDetails] = useState(false);

    return (
        <NavLayout mode="flex">
            <Box sx={{ flexGrow: 1, display: "grid", placeItems: "center", transform: "translateY(-25%)" }}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: theme.spacing(12)}}>
                    <SadRoundSquareIcon height={"9rem"} width={"9rem"} />
                    <Box maxWidth={"36rem"}>
                        <Typography variant="h3" color="grey">Coś poszło nie tak...</Typography>

                        <Typography padding={"1em 0"} variant="body1" color="initial">Spróbuj ponownie później lub skontaktuj się ze specjalistą</Typography>

                        <Link sx={{ color: "#83AFEF", padding: "1em 0" }} underline="hover" onClick={() => setShowDetails(true)}>
                            {'Zobacz szczegóły'}
                        </Link>
                        {
                            showDetails ? (
                            <Box sx={{width: "100%"}}>
                                <Typography>Kod błędu: {error.code ?? error}</Typography>
                                <Typography>Komunikat: {error.message}</Typography>
                            </Box>
                            ) : (<></>)
                        }
                    </Box>
                </Box>
            </Box>
        </NavLayout>
    );
}
