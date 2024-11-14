import {createTheme} from '@mui/material/styles';
import "@mui/material";


declare module '@mui/material/styles' {
    interface Palette {
        accent: {
            light: string;
            dark: string;
        };
        surface: {
            main: string;
        };
    }
    // allow configuration using `createTheme()`
    interface PaletteOptions {
        accent: {
            light: string;
            dark: string;
        };
        surface: {
            main: string;
        };
    }
}


const theme = createTheme({
    typography: {
        fontFamily: "Geologica"
    },
    palette: {
        primary: {
            main: "#85B93E"
        },
        secondary: {
            main: "#58ABB6"
        },
        accent: {
            light: "#F5C129",
            dark: "#3A2552"
        },
        surface: {
            main: "#E7ECEE"
        },
        tonalOffset: 0.2
    },
    shape: {
        borderRadius: 20
    }
});

export default theme;