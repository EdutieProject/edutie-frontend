import {createTheme} from '@mui/material/styles';
import {grey} from '@mui/material/colors'
import "@mui/material";


const theme = createTheme({
    typography: {
        fontFamily: "Geologica"
    },
    palette: {
        primary: {
            main: "#3f9500"
        },
        secondary: {
            main: "#95008a"
        },
        tonalOffset: 0.2
    },
    shape: {
        borderRadius: 20
    }
});

export default theme;