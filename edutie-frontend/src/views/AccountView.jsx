import { Container, Typography, Button, Grid, Box } from "@mui/material";
import User from '../../assets/User.png';
import PieChart from "../components/charts/PieChart";
import Header from "../components/global/Header"
import LineChart from "../components/charts/LineChart";
// const User = require('../../assets/User.png')

function UserCircle(){
    const size = 250;
    const pSize = (size * 0.08);
    
    const setTitleInMiddle = {
        textAlign:'center',
        fontWeight:600
    }

    const setTitleInMiddle_h5 = {
        textAlign:'center',
        fontWeight:400
    }
    return(
        <Grid container spacing={1} direction={'column'} mb={10}>
            <Grid item>
                    <Container sx={{width:size, height:size, borderRadius:50, border:"1px solid #227B9B", backgroundColor:'white'}}> 
                        <img src={User} style={{padding:pSize}}/>
                    </Container>
            </Grid>
        
            <Grid item>     
                <Typography variant="h3" sx={setTitleInMiddle}>Jan Kowalski</Typography>    
            </Grid>
            <Grid item spacing={1}>     
                <Typography variant="h5" sx={setTitleInMiddle_h5}>#302103</Typography>    
            </Grid>
        </Grid>
        )
}

function UserSettings(){
    return(
        <Container sx={{flex:1, flexDirection:'column', justifyContent:'center'}}>
            <UserCircle/>
            

            <Grid container direction={'column'} spacing={3}>
            {/* <Grid item>
                <Button sx={{
                    borderRadius:5, 
                    boxShadow:12, 
                    bgcolor:'#AEF10F', 
                    color:'black', 
                    '&:hover': {
                        backgroundColor: '#fff',
                        color: 'black',
                    }}} variant="contained"> 
                    <Typography>Predispositions</Typography> 
                </Button>
            </Grid>
            <Grid item>
            <Button sx={{
                    borderRadius:5, 
                    boxShadow:12, 
                    bgcolor:'#AEF10F', 
                    color:'black', 
                    '&:hover': {
                        backgroundColor: '#fff',
                        color: 'black',
                    }}} variant="contained">                     
                    <Typography>LEARNING STATISTICS</Typography> 
                </Button>
            </Grid> 
            <Grid item>
                <Button sx={{
                    borderRadius:5, 
                    boxShadow:12, 
                    bgcolor:'#AEF10F', 
                    color:'black', 
                    '&:hover': {
                        backgroundColor: '#fff',
                        color: 'black',
                    }}} variant="contained">                     
                    <Typography>SETTINGS</Typography> 
                </Button>
            </Grid>*/}
            </Grid>
        </Container>)
}

export default function AccountView(){

    const componentsTitle = {
        textAlign:'center', 
    }
    
    return (
        <Container>
        <Grid width="80vw" container direction="row" >
            <Grid item xs={12}>
                <Typography variant="h4" sx={{ 
                    textAlign:'center', 
                    marginBottom:4, 
                    fontWeight:200   }}>ILearningProfile</Typography>
                <UserSettings/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h5" sx={componentsTitle}>Predispositions</Typography>
                <PieChart/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h5" sx={componentsTitle}>Learning Statistics</Typography>
                <LineChart/>
            </Grid>
        </Grid>
     </Container>
    )
}