import { Grid, Typography, Card, Avatar } from "@mui/material"
import { Stack,  } from "@mui/system"

const News = () => {

    return(
      <Card component={Stack}
      spacing={3}
      direction="column"
      sx={{px: 3, py: 5, borderRadius: 2}}>
         <Grid container spacing={1}>
                <Grid item xs={12} sx={{textAlign:'center', boxShadow:0}} >
                    <Typography variant="h5" fontWeight={600}> Kontakt</Typography>
                </Grid>
                <Grid item xs={6}>
                    <img width={60}src="src/assets/facebook.png"/>
                </Grid>
                 <Grid item xs={6}>
                    <img width={60}src="src/assets/instagram.png"/>
                </Grid> 
                <Grid item xs={6}>
                    <img width={60}src="src/assets/linkedin.png"/>
                </Grid>
                <Grid item xs={6}>
                    <img width={60}src="src/assets/gmail.png"/>
                </Grid>

            </Grid>
        </Card>
    )
}

export default News