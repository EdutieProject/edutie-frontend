import { Toolbar, Typography, IconButton, AppBar, Grid, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '@mui/system';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  headerButton:{
    backgroundColor: "#21b6ae",
    padding: "18px 36px",
  },
  headerButtonTypography:{
      color:'white'
  }
})

export default function Header({title})
{
    const classes = useStyles();
    return(
        <AppBar height={30} >
            <Toolbar  sx={{backgroundColor:'#14AE5C'}}>
              <Grid container spacing={4}>
                  <Grid item>     
                    <Button href="/"  className={classes.headerButton}>           
                      <Typography variant='h5' className={classes.headerButtonTypography}>
                            Home
                      </Typography>
                    </Button> 
                  </Grid>
                  

                  <Grid item>
                    <Button href="/trees" className={classes.headerButton}> 
                    <Typography variant='h5' className={classes.headerButtonTypography}>
                      ILearningTrees
                    </Typography>
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button href="/account" className={classes.headerButton}> 
                      <Typography variant='h5' className={classes.headerButtonTypography}>
                        Profile
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button href="/signin" className={classes.headerButton}> 
                      <Typography variant='h5' className={classes.headerButtonTypography}>
                        Sign In
                      </Typography>
                    </Button>
                  </Grid>
                   <Grid item>
                    <Button href="/signup" className={classes.headerButton}> 
                      <Typography variant='h5' className={classes.headerButtonTypography}>
                       Sign Up 
                      </Typography>
                    </Button>
                  </Grid>
 
              </Grid>

              <Typography variant="h5" fontWeight={600}>
                Edutie
              </Typography>
            </Toolbar>
        </AppBar>
    )
    
}