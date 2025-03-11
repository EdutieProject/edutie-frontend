import {createTheme} from '@mui/material/styles';
import "@mui/material";


declare module '@mui/material/styles' {
    interface Palette {
        accentFirst: {
            light: string;
            main: string;
            dark: string;
        };
        accentSecond: {
            light: string;
            main: string;
            dark: string;
        };
        surface: {
            main: string;
        };
    }
    // allow configuration using `createTheme()`
    interface PaletteOptions {
        accentFirst: {
            light: string;
            main: string;
            dark: string;
        };
        accentSecond: {
            light: string;
            main: string;
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
        accentFirst: {
            light: "#F7CD50",
            main: "#F5C129",
            dark: "#EAB20B"
        },
        accentSecond: {
            light: "#513371",
            main: "#3C2654",
            dark: "#281938",
        },
        surface: {
            main: "#E7ECEE"
        },
        tonalOffset: 0.2
    },
    shape: {
        borderRadius: 10
    }
});

export default theme;