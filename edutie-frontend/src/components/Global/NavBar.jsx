import * as React from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { useDispatch, useSelector } from 'react-redux'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { setNavElement } from '../../features/redux/navigation/navigationSlice';
import { useNavigate } from 'react-router-dom';
import DistributedLearningIcon from '../customIcons/DistributedLearningIcon';

const navElements = [
  {
    id:1,
    icon: <HomeOutlinedIcon fontSize='large'/>,
    href: '/',
    
  },
  {
    id:2,
    icon: <SchoolOutlinedIcon fontSize='large'/>,
    href: '/learn',
  },
  {
    id:3,
    icon: <DistributedLearningIcon fontSize='large'/>,
    href: '/',
  },
  {
    id:4,
    icon: <PersonOutlinedIcon fontSize='large'/>,
    href: '/',
  },
  {
    id:5,
    icon: <SettingsOutlinedIcon fontSize='large'/>,
    href: '/playground',
  }
];

//TODO: how about merging this into the navbar component ?
function NavElement({item}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const activeNavElement = useSelector(state => state.navigation.activeID)
  
  const press = (selectedItem) => {
      console.log('button pressed', selectedItem.id)
      dispatch(setNavElement(selectedItem.id))
      navigate(selectedItem.href)
  }

  return(
        <IconButton 
        onClick={() => press(item)} 
        color={ activeNavElement == item.id ? "primary" : "white" } 
        sx={{backgroundColor: activeNavElement == item.id ? theme.palette.common.white : "transparent"}}
        size='large'
        disableRipple
        disableFocusRipple
        >
          {item.icon}
        </IconButton>
  );
}

export default function NavBar() {
  const theme = useTheme();

  const styles = {
    navBox: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.primary.main,
      gap: theme.spacing(4),
      padding: theme.spacing(4),
      boxShadow: 3
    },
    wrapperBox: {
      display: "flex",
      padding: theme.spacing(4)
    }
  };
  
  return (
    <Box sx={styles.navBox}>
        { 
          navElements.map(
            (item) => <NavElement key={item.id} item={item}/>
            )
        }
    </Box>
  );
}