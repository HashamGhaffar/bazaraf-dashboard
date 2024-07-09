import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#5BB28B",
    },
    secondary: {
      main: "#153250",
    },
    grey: {
      300: "#7B7B7B",
      400: "#666666",
      500: "#606060",
      600: "#333333",
      900: "#0C0C0D",
    },
    error: {
      main: "#FF0000",
    },
    warning: {
      main: "#FFA500",
    },
    info: {
      main: "#87CEEB",
    },
    success: {
      main: "#008000",
    },
  },
});

export default theme;
