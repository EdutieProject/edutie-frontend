import {createTheme} from '@mui/material/styles';
import "@mui/material";


const theme = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true
            }
        }
    },
    typography: {
        fontFamily: "Inter",
        button: {
            fontFamily: "Baloo",
            textTransform: "none"
        }
    },
    palette: {
        primary: {
            main: "#85B93E"
        },
        secondary: {
            main: "#65469B"
        },
        tonalOffset: 0.2
    },
    shape: {
        borderRadius: 10
    }
});

export default theme;