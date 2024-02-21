import { Box, Container, Grid, Typography } from "@mui/material";
import Header from "../components/Global/Header";

export default function TaskView(props) {
    return (    
    <Container maxWidth="xl">
        <Header/>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Box>
                    <Typography>Hello World!</Typography>
                </Box>
            </Grid>
            <Grid item xs={6} style={{display: "flex", flexDirection: "column", gap: 2}}>
                <Box>
                    <Typography>Hello World! 1</Typography>
                </Box>
                <Box>
                    <Typography>Hello World! 2</Typography>
                </Box>
            </Grid>
        </Grid>
    </Container>
    )
}