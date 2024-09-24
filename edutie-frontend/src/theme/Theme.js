import { createTheme } from '@mui/material/styles';
import { grey, green, yellow } from '@mui/material/colors'


const theme = createTheme({
  typography: {
    fontFamily: "Geologica"
  },
  palette: {
    primary: {
      main: green[600]
    },
    secondary: {
      main: yellow[200]
    },
    surface: {
      main: grey[200]
    }
  },
  shape: {
    borderRadius: 20
  }
});

export default theme;