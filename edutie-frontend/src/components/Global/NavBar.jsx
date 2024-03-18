import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, IconButton, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SettingsIcon from '@mui/icons-material/Settings';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import { useDispatch, useSelector } from 'react-redux'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { setNavElement } from '../../features/navigation/navigationSlice';
import { useNavigate } from 'react-router-dom';

const navElements = [
  {
    id:1,
    icon: {
      active: <HomeIcon fontSize='large'/>,
      inactive: <HomeOutlinedIcon fontSize='large'/>
    },
    href: '/',
    
  },
  {
    id:2,
    icon: {
      active: <SchoolIcon fontSize='large'/>,
      inactive: <SchoolOutlinedIcon fontSize='large'/>
    },
    href: '/trees',
  },
  {
    id:3,
    icon: {
      active: <PersonIcon fontSize='large'/>,
      inactive: <PersonOutlineIcon fontSize='large'/>
    },
    href: '/account',
  },
  {
    id:4,
    icon: {
      active: <EmailIcon fontSize='large'/>,
      inactive: <MailOutlineIcon fontSize='large'/>
    },
    href: '/signin',
  },
  {
    id:4,
    icon: {
      active: <SettingsIcon fontSize='large'/>,
      inactive: <SettingsOutlinedIcon fontSize='large'/>
    },
    href: '/signin',
  }
]

//TODO: merge this into the navbar component
function NavElement({item}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const activeNavElement = useSelector(state => state.navigation.activeID)
  
  const press = (item) => {
      console.log('button pressed', item.id)
      dispatch(setNavElement(item.id))
      navigate(item.href)
  }

  return(
        <IconButton 
        onClick={press} 
        color={ activeNavElement == item.id ? "primary" : "white" } 
        sx={{backgroundColor: activeNavElement == item.id ? theme.palette.white.main : "transparent"}}
        size='large'>
          {activeNavElement == item.id ? item.icon.active : item.icon.inactive}
        </IconButton>
  );
}

export default function NavBar() {
  const theme = useTheme();

  // different styling approach (?)
  const styles = {
    navBox: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.primary.main,
      gap: theme.spacing(2),
      padding: theme.spacing(2),
      boxShadow: 3
    }
  };
  
  return (
    <Box sx={styles.navBox}>
      { 
        navElements.map((item) => 
        <NavElement key={item.id} item={item}/>) 
      }
    </Box>
  );
}