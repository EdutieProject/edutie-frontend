import { Typography, Box } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import '@fontsource/inter';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  outsideArea: {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom:0,
    marginTop:2,
    
  },
  outsideBorder: {
    flex:1,
    justifyContent: 'center',
    borderRadius: 100,
    border: '20px solid #D9D9D9',
    padding: 5,
    boxShadow: '0.3em 0.5em 1em rgba(0, 0, 0, 0.3)',
    width: 100,
    "&:hover":{
      opacity:.6,
      transition:'.2s'
    },
    transition:'1s'
  },
  middleCircle: {
    backgroundColor: '#227B9B', 
    borderRadius: 50, 
    height: 100, 
    width:'100%', 
    flex:1, 
    alignItems: 'center', 
    justifyContent: 'center',

    
  },

  textStyle: {
    fontSize: 25, 
    color: "#227B9B", 
    marginTop: 0.5, 
    marginBottom:0,
    fontWeight:500
  }

})

function Circle({title, icon}) {
  const classes = useStyles();
  return (
    <Box className={classes.outsideArea}>
      <Box className={classes.outsideBorder}>
        <Box className={classes.middleCircle}>
          {icon}
        </Box>
      </Box>
      <Typography  className={classes.textStyle} >
        {title}
      </Typography>
    </Box>
  );
}

export default Circle;
