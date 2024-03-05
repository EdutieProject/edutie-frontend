import { createTheme } from "@mui/material";

const theme =  
    createTheme({
      breakpoints: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536
      },
    
      palette: {
        background: {
          default: '#388659',
          primary:'#1FB45E',
          secondary: '#F1F1F1'
        },
        primary: {
          main: '#388659' 
        },
        secondary: {
          main: '#CEEEC2'
        },
        text: {
          primary: '#000',
          secondary: 'rgba(0,0,0,0.6)',
          disabled: 'rgba(0,0,0,0.38)'
        }
      },

      typography: 
      {
        // fontFamily:['Baloo Bhai 2']
        fontFamily:['Geologica']
      }
    })
  


export default theme;