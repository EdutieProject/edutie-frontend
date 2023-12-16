import { Container, Typography, Button, Grid, Box } from "@mui/material";
import User from '../../assets/User.png';
import PieChart from "./PieChart";
import Header from "../Global/Header"
import LineChart from "./LineChart";
// const User = require('../../assets/User.png')

function UserCircle(){
    const size = 250;
    const pSize = (size * 0.08);
    return(
        <Grid container spacing={1} direction={'column'} mb={10}>
            <Grid item>
                    <Container sx={{width:size, height:size, borderRadius:50, border:"1px solid #227B9B", backgroundColor:'white'}}> 
                        <img src={User} style={{padding:pSize}}/>
                    </Container>
            </Grid>
        
            <Grid item>     
                <Typography variant="h4" sx={{fontWeight:600}}>Jan Kowalski</Typography>    
            </Grid>
            <Grid item spacing={1}>     
                <Typography variant="h4" sx={{fontWeight:100}}>#302103</Typography>    
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

export default function AccountPage(){

    return (
        <>
            <Header title={"ILearningProfile"}/>
            <Container  width={2000} sx={{backgroundColor:'white', flex:1, alignItems:'center', justifyItems:'center',  width:'100%', margin:0, padding:0}}>
                <Grid rowSpacing={5} container direction="row">
                    <Grid item xs={12}>
                        <Typography>ILearningProfile</Typography>
                        <UserSettings/>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Predispositions</Typography>
                        <PieChart/>

                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Learning Statistics</Typography>
                        <LineChart/>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}