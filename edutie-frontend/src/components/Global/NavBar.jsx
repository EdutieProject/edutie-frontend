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
      active: <HomeIcon/>,
      inactive: <HomeOutlinedIcon/>
    },
    href: '/',
    
  },
  {
    id:2,
    icon: {
      active: <SchoolIcon/>,
      inactive: <SchoolOutlinedIcon/>
    },
    href: '/trees',
  },
  {
    id:3,
    icon: {
      active: <PersonIcon/>,
      inactive: <PersonOutlineIcon/>
    },
    href: '/account',
  },
  {
    id:4,
    icon: {
      active: <EmailIcon/>,
      inactive: <MailOutlineIcon/>
    },
    href: '/signin',
  }
]

//TODO: integrate into navbar
function NavElement({item, sx}) {

  const dispatch = useDispatch();
  const navigate = useNavigate() 

  const activeNavElement = useSelector(state => state.navigation.activeID)
  
  const press = () => {
      console.log('button pressed', id)
      dispatch(setNavElement(id))
      navigate(href)
  }

  return(
        <IconButton onClick={press} size='large'>
          {activeNavElement == item.id ? item.icon.active : item.icon.inactive}
        </IconButton>
  );
}

// function Footer()
// {

//   return(
//       <Typography sx={{postion:'fixed', textAlign:'center', bottom:0 }}>
//         <IconButton  edge="start" color="inherit" aria-label="menu" >
//           <SvgIcon sx={{ color:'white', textAlign:'center', fontSize:40 }}>
//             <MeetingRoomOutlinedIcon/>
//           </SvgIcon>
//         </IconButton>
//       </Typography>
//   ) 
// }

export default function NavBar() {

  const theme = useTheme();

  // change styling this is fucking ridiculous
  const styles = {
    navBox: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.primary.main,
      gap: theme.spacing(2),
      padding: theme.spacing(2)
    },
    navElem: {
      padding: theme.spacing(2)
    }
  };
  
  return (
    <Box sx={styles.navBox}>
      <Typography textAlign="center" fontSize="large">
        E.
      </Typography>
      { 
      navElements.map((item) => 
        <NavElement 
          key={item.id} 
          item={item}
        />) 
      }
    </Box>
  );
}