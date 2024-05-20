import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";

export default function SettingsView(){
    
    const colors = [
        {
            id: 1,
            backgroundPrimary:'#1FB45E',
            backgroundSecondary:'#F1F1F1'
        },
        {
            id: 2,
            backgroundPrimary:'#E08700',
            backgroundSecondary:'#FEF9E7'
        },
        {
            id: 3,
            backgroundPrimary:'#73AFD1',
            backgroundSecondary:'#DEFBFF'
        },
    ] 

    
    return(
        <Container>
        <Grid container width="80vw" direction="column" spacing={1}>
            <Grid item xs={3}>
    `           <Typography>
                    Color?
                </Typography>
            </Grid> 
            {
                colors.map((item) => {
                    return(
                    <Grid item xs={colors.length/12} key={item.id} >
                        <Container>
                            <Button onClick={() => {}} color="primary" sx={{ backgroundColor: item.backgroundPrimary}}>
                                <Typography color={item.backgroundSecondary}>
                                   Color {item.id} 
                                </Typography>
                            </Button>    
                        </Container>
                         
                    </Grid>)        
                })
            }
             

            </Grid>
        </Container>
    )
}