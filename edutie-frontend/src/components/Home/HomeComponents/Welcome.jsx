
import { Card, Typography, Grid, Container, Paper } from "@mui/material";

export default function Welcome()
{

    return(
        // <Paper elevation={6} sx={{
        //     width:'50%',
        //     height:'90%',
        //     borderRadius:5,
        //     padding:2,
        //     backgroundColor:'background.secondary'
        // }}>
            <Grid container direction='row'>
                <Grid item xs={4} sm={4} md={4} pt={3} pb={5}>
                    <Typography variant="h4"
                     sx={{
                        fontWeight:700,
                        display:'flex',
                        textAlign:'center',
                        color:'primary',
                        }}>
                        Cześć Janek!
                    </Typography>    
                    <Typography 
                    sx={{ 
                        display:'flex',
                        textAlign:'center',
                        color:'secondary',
                    }} 
                    variant="h5" >
                        Dobrze cię widzieć
                    </Typography>        
                </Grid>
                <Grid item xs={8} sm={8} md={8} >
                    
                </Grid>
            </Grid>
            
        // </Paper>
        
    )
}