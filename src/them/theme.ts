import { indigo } from "@mui/material/colors";
import { createTheme } from "@mui/material";

const theme = createTheme({
    // Primaryカラーを設定
    palette: {
        primary: {
            main: '#b71c1c',
        },
        secondary: {
            main: '#8e24aa',
        },
    },
    typography: {
        fontFamily: '"Comic Neue", cursive'
    },
});

export default theme;