import { createTheme } from '@mui/material/styles';
import { grey, green } from '@mui/material/colors'


const theme = createTheme({
  typography: {
    fontFamily: "Geologica"
  },
  palette: {
    primary: {
      // main: "#1FB45E"
      main: green[600]
    },
    surface: {
      main: grey[200]
    },
    white: {
      main: "#FFFFFF"
    },
    black: {
      main: "#000000"
    }
  },
});

export default theme;