import { createTheme } from '@mui/material/styles';
import { grey, green, amber } from '@mui/material/colors'


const theme = createTheme({
  typography: {
    fontFamily: "Geologica"
  },
  palette: {
    primary: {
      main: "#00c821"
    },
    secondary: {
      main: "#c800a7"
    },
    surface: {
      main: grey[200]
    }
  },
  shape: {
    roundedRadius: "990px",
    borderRadius: 20,
    minimalRadius: "10px"
  }
});

export default theme;