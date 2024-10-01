import { createTheme } from '@mui/material/styles';
import { grey, green, amber } from '@mui/material/colors'


const theme = createTheme({
  typography: {
    fontFamily: "Geologica"
  },
  palette: {
    primary: {
      main: "#11c800"
    },
    secondary: {
      main: "#ea00c3"
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