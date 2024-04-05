import { useTheme, Container, Box } from "@mui/material";
import NavBar from "../../components/Global/NavBar";


export default function NavLayout({ children, mode }){
    // const isHeightSmall = useMediaQuery("(min-height: 550px)"); adjust imports
    // const isWidthSmall = useMediaQuery("(min-width: 600px)");
    const theme = useTheme();
    const styles = {
        screenBox: {
            display: "flex", 
            flexDirection: "row", 
            justifyItems: "stretch",
            paddingX: theme.spacing(2)
        },
        contentBox: {
            flexGrow: 1, 
            padding: theme.spacing(2),
            paddingX: theme.spacing(16)
        },
    };

    return(
            <Container maxWidth={false} disableGutters sx={styles.screenBox}>
                <NavBar/>
                <Box sx={styles.contentBox}>
                    { children }
                </Box>
            </Container>
    );
}