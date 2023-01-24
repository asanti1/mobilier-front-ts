import { createTheme } from "@mui/material/styles";
import { ThemeOptions } from "@mui/material";
const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#c7bba4",
    },
    secondary: {
      main: "#969fb4",
    },
    text: {
      primary: "#ffffff",
    },
    background: {
      default: "#343944",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9801",
    },
    info: {
      main: "#62727f",
    },
    success: {
      main: "#4caf50",
    },
    divider: "#ffebee",
  },
};

const theme = createTheme(themeOptions);

export default theme;
