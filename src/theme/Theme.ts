import {createTheme} from '@mui/material/styles';
import {grey} from '@mui/material/colors'
import "@mui/material";


const theme = createTheme({
    typography: {
        fontFamily: "Geologica"
    },
    palette: {
        primary: {
            main: "#80C23E"
        },
        secondary: {
            main: "#50B2BE"
        },
        tonalOffset: 0.2
    },
    shape: {
        borderRadius: 20
    }
});

export default theme;