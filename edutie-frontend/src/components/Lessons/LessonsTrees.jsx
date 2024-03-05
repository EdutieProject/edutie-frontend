import { Typography,Card, CardContent, CardActions, Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Container } from "@mui/system";
import Header from "../Global/Header";
import { CardActionArea, CardMedia } from "@mui/material";
      
function PostCard({title, desc}){
    return(
    <Card sx={{
        maxwidth:300, 
        borderRadius:10,
        padding:5,
        paddingTop:20,
        transition:'1s',
        color:'white',
        background:'radial-gradient(circle, rgba(155,175,217,1) 0%, rgba(16,55,131,1) 100%)',
        "&:hover":{
            transition:'1s',
            // background: 'linear-gradient(90deg, rgba(29,179,9,1) 0%, rgba(132,182,54,1) 36%, rgba(0,212,255,1) 100%)', 
        }
        }}>
        <CardContent>
            <Typography variant="h4" sx={{textAlign:'left'}}>{title}</Typography>
            <Typography variant="small">{desc}</Typography>
        </CardContent>
        <CardActions >
            <Button href="/lesson" sx={{
                flex:1, 
                justifyContent:'center', 
                fontWeight:600,
                color:'black',
                backgroundColor:'#EDEEF0',
                transition:'1s',
                borderRadius:20,
                '&:hover':{
                    color:'white',
                    transition:'.5s'
                }}}>
                <Typography variant="small">Zobacz</Typography> 
            </Button>
        </CardActions>
    </Card>
    )
}
function PostCard2({title, desc}){
    return(
    <Card sx={{
        maxwidth:300, 
        borderRadius:10,
        padding:5,
       
        transition:'1s',
        color:'white',
        background:'rgba(16,55,131,1)',
        "&:hover":{
            transition:'1s',
            // background: 'linear-gradient(90deg, rgba(29,179,9,1) 0%, rgba(132,182,54,1) 36%, rgba(0,212,255,1) 100%)', 
        }
        }}>
        <Container sx={{ width:'100%', height:'100%',  }}>
            <img src="src/assets/ExampleImage.webp"  width="100%" height="100%" objectFit="fill" overflow="hidden" alt="hey"/>
        </Container>
        <CardContent sx={{paddingTop:5}}>
            
            <Typography variant="h6" sx={{textAlign:'left'}}>{title}</Typography>
            <Typography variant="small">{desc}</Typography>

        </CardContent>
        <CardActions >
            <Button href="/lesson" sx={{
                flex:1, 
                justifyContent:'center', 
                fontWeight:600,
                color:'black',
                backgroundColor:'#EDEEF0',
                transition:'1s',
                borderRadius:20,
                '&:hover':{
                    color:'white',
                    transition:'.5s'
                }}}>
                <Typography variant="small">Zobacz</Typography> 
            </Button>
        </CardActions>
    </Card>
    )
}

const srcImages = ['chemistry.webp','ExampleImage.webp', 'atom.webp', 'biology.webp', 'Jan_Kochanowski.webp','english.webp' ]
function MultiActionAreaCard({title, desc, img}) {
    return (
      <Card sx={{ maxWidth: 345, borderRadius:5 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={'src/assets/' + srcImages[img]}
            alt="green iguana"
          />
          <CardContent >
            <Typography variant="small" fontSize={10} >Harvard University</Typography>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {desc}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        <Button href="/lesson" sx={{
                flex:1, 
                justifyContent:'center', 
                fontWeight:600,
                color:'black',
                backgroundColor:'#EDEEF0',
                transition:'1s',
                borderRadius:20,
                '&:hover':{
                    color:'white',
                    transition:'.5s'
                }}}>
                <Typography variant="small">Zobacz</Typography> 
            </Button>
        </CardActions>
      </Card>
    );
  }


const useStyles = makeStyles({
    cardLesson:{
        maxWidth: 300,
        border:'1px solid #227B9B',
        boxShadow:'10px 10px 10px 10px grey',
        backgroundColor:'black'
    },

    cardLessonBg:{
        backgroundColor:'black'
    }
})

function CourseCard()
{
    const classes = useStyles();
    return(
        <Card className={classes.cardLesson} sx={{borderRadius:10}} >
                <CardContent>
                  <Typography variant='h4'  gutterBottom sx={{flex:1, flexWrap:'wrap'}}>
                    Wstep Do Programowania
                  </Typography>
                  <Typography variant="h4" component="div">

                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  poznaj ważne narzędzia programistyczne
                  </Typography>
                  
                </CardContent>
                <CardActions>
                  <Button href="/lesson" size="small" sx={{flex:1, justifyContent:'center', color:'black', fontWeight:600}}>Zobacz</Button>
                </CardActions>
                </Card>
    )
}

export default function LessonTrees()
{
    return(
            <Container>
            <Grid container  width="80vw" direction='column' > 
                <Typography variant="h3"  fontWeight={600}>Przeglądaj setki Kursów</Typography>
                <Grid item container spacing={2} mt={2}> 
                    
                    <Grid item xs={6} sm={4} md={3}>
                        <MultiActionAreaCard img={2} title={"Fizyka"} desc={"lorem ipsum lorem ipsum lorem ipsum"}/>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                        <MultiActionAreaCard img={1} title={"Matematyka"} desc={"lorem ipsum lorem ipsum lorem ipsum"}/>
                    </Grid> 
                    <Grid item xs={6} sm={4} md={3}>
                        <MultiActionAreaCard img={0} title={"Chemia"}desc={"lorem ipsum lorem ipsum lorem ipsum"}/>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                        <MultiActionAreaCard img={3} title={"Biologia"} desc={"lorem ipsum lorem ipsum lorem ipsum"}/>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                        <MultiActionAreaCard img={4} title={"J.Polski"} desc={"lorem ipsum lorem ipsum lorem ipsum"}/>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                        <MultiActionAreaCard img={5} title={"J.Ang"} desc={"lorem ipsum lorem ipsum lorem ipsum"}/>
                    </Grid>
                </Grid>
            </Grid>
            </Container>
    )
}