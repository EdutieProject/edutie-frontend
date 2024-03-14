import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container  } from '@mui/system';
import { Grid, SvgIcon } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SettingsIcon from '@mui/icons-material/Settings';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { setNavElement } from '../../features/navigation/navigationSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NavElement({id, iconActive, iconInactive, href}) {

  const dispatch = useDispatch();
  const navigate = useNavigate() 

  const activeNavElement = useSelector(state => state.navigation.activeID)
  
  const press = () => {
      console.log('button pressed', id)
      dispatch(setNavElement(id))
      navigate(href)
  }

  return(
        <Grid item>
            <Typography sx={{ textAlign:'center' }}>
              <Button onClick={() => press()}  edge="start" color="inherit" aria-label="menu" >
                <SvgIcon sx={{color:'white', textAlign:'center', fontSize:40 }}>
                  {activeNavElement == id ? iconActive : iconInactive}
                </SvgIcon>
              </Button>
            </Typography>
        </Grid>
  )
}

function Footer()
{

  return(
      <Typography sx={{postion:'fixed', textAlign:'center', bottom:0  }}>
        <IconButton  edge="start" color="inherit" aria-label="menu" >
          <SvgIcon sx={{ color:'white', textAlign:'center', fontSize:40 }}>
            <MeetingRoomOutlinedIcon/>
          </SvgIcon>
        </IconButton>
      </Typography>
  ) 
}

export default function NavBar() {

   
  const navElements = [
    {
      id:1,
      iconActive: <HomeIcon/>,
      iconInactive: <HomeOutlinedIcon/>,
      href: '/',
      
    },
    {
      id:2,
      iconActive: <SchoolIcon/>,
      iconInactive: <SchoolOutlinedIcon/>,
      href: '/trees',
    },
    {
      id:3,
      iconActive: <PersonIcon/>,
      iconInactive:  <PersonOutlineIcon/>,
      href: '/account',
    },
    {
      id:4,
      iconActive: <EmailIcon/>,
      iconInactive: <MailOutlineIcon/> ,
      href: '/signin',
    },
    {
      id:5,
      iconActive: <SettingsIcon/>,
      iconInactive: <SettingsOutlinedIcon/>,
      href: '/signup',
    },
    {
      id:6,
      iconActive: <SettingsIcon/>,
      iconInactive: <SettingsOutlinedIcon/>,
      href:"/settings"   
    }    
  ]
  
  return (
    
    <Container sx={{
            borderRadius:8,
            minHeight:'90vh',
            width:150,
            backgroundColor:'background.primary'
          }} >
        
          {/*!!! Title of Navbar !!!*/}
          <Typography pt={4} sx={{ 
          fontWeight:600,
          fontSize:48,
          color:'white'
          }} >
          Edu.
          </Typography>
          
          {/*!!! elements for the navbar !!!*/}
          <Grid container direction='row' sx={{ 
                        display:'flex',
                        height:'70vh',
                        flexDirection:'column',
                        alignContent:'center',
                        justifyContent:'center',
                        gap:'6%',
                        flexWrap:'nowrap'
                        }}>
            {
              navElements.map((item) => <NavElement key={item.id} id={item.id} href={item.href} iconActive={item.iconActive} iconInactive={item.iconInactive} />)
            }
          </Grid>
          <Footer/>   
    </Container>
  );
}