import { Button, Grid, Paper, Typography } from "@mui/material";




export default function EdutiePaper({ img, imgWidth, imgHeight, mt, padding, height, width, itemTitle, itemSubTitle})
{
   return(
   
   <Paper sx={{ 
       backgroundColor:'background.secondary', 
       padding: (padding ? padding : 2 ),
       marginTop: (mt ? mt : 2),
       borderRadius:5
       }}>
       <Grid container spacing={4} >
            <Grid item xs={3} sx={{display:'flex', alignSelf:'center',  justifyContent:'left'}} >
                <img src="./src/assets/english.webp" 
                     alt="" 
                     width={imgWidth ? imgWidth : 200}
                     height={imgHeight ? imgHeight : 200}
                     style={{ borderRadius:15, margin:1 }} />
            </Grid>
            <Grid item xs={5} sx={{ alignSelf:'center', }}> 
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, alignSelf:'center' }}>{itemTitle ? itemTitle : "Trygonometria"}</Typography> 
                    <Typography variant="overline">{itemSubTitle ? itemSubTitle : "Własności trygonometryczne w układzie współrzędnych"}</Typography>
            </Grid>
            <Grid item xs={4} sx={{ flex:1, flexDirection:'column', alignSelf:'center' }}>
                <Grid container spacing={5}>
                    <Grid item >
                        <Typography sx={{ textAlign:'center'}}>fire</Typography>
                    </Grid>
                    <Grid item >
                        <Typography sx={{ textAlign:'center'}}>4.9</Typography>
                    </Grid>
                    <Grid item >
                        <Button variant="contained" sx={{ backgroundColor:"background.primary", alignSelf:'center' }}>Przejdź</Button>
                    </Grid>
                </Grid>
            </Grid>
       </Grid>
   </Paper>)
}