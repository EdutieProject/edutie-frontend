import { Grid, Typography, Card, Avatar } from "@mui/material"
import { Stack,  } from "@mui/system"

const NewsCard = ({title, desc}) => {
    return(
        <Card direction="column" sx={{px:3, py:2, textAlign:'left', boxShadow:0, backgroundColor:'background.secondary' }}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Avatar alt="Remy Sharp" src="src/assets/biology.webp" />
                            </Grid>
                            <Grid item>
                                <Typography sx={{fontWeight:700}} >{title}</Typography>
                                <Typography variant="small">{desc}</Typography>
                            </Grid>
                        </Grid>
                    </Card>
    )
}

const News = () => {

    return(
      <Card component={Stack}
      spacing={3}
      direction="column"
      sx={{px: 3, py: 5, borderRadius: 2, backgroundColor:'background.secondary'}}>
         <Grid container>
                <Grid item xs={12} sx={{textAlign:'left', boxShadow:0, }} >
                    <Typography variant="h5" fontWeight={600}> Wiadomości</Typography>
                </Grid>
                <Grid item xs={12} >
                    <NewsCard title={"Dni Nauki!"} desc={"Dzisiaj na wiśniowej odbyły się dni nauki"}/>
                </Grid>
                 <Grid item xs={12} >
                    <NewsCard title={"Czarnek schodzi ze stanowiska"} desc={"Dzisiaj na wiśniowej odbyły się dni nauki"}/>
                </Grid>
            </Grid>
        </Card>
    )
}

export default News;