import {createTheme} from '@mui/material/styles';
import {grey} from '@mui/material/colors'
import "@mui/material";

declare module "@mui/material/styles" {
    // allow configuration using `createTheme`
    interface ThemeOptions {
        shape?: {
            roundedRadius: string | number;
            borderRadius: string | number,
            minimalRadius: string | number
        };
    }

    interface PaletteOptions {
        surface?: {
            main: string;
        }
    }
}

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