import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#760E25",
      light: "#AA424D",
      dark: "#450000",
    },
    secondary: {
      main: "#FDA402",
      light: "#FFD54A",
      dark: "#C47500",
    },
  },
  typography: {
    fontFamily: ["Poppins", "Helvetica", "Arial", "sans-serif"].join(","),
    h1: {
      fontSize: "36px",
      fontWeight: 700,
      "@media (min-width:500px)": {
        fontSize: "36px",
      },
      "@media (min-width:1000px)": {
        fontSize: "36px",
      },
      "@media (min-width:1500px)": {
        fontSize: "36px",
      },
    },
    h3: {
      fontSize: "22px",
      fontWeight: 600,
      "@media (min-width:500px)": {
        fontSize: "22px",
      },
      "@media (min-width:1000px)": {
        fontSize: "22px",
      },
      "@media (min-width:1500px)": {
        fontSize: "22px",
      },
    },
    body1: {
      fontSize: "14px",
      fontWeight: 500,
      "@media (min-width:500px)": {
        fontSize: "14px",
      },
      "@media (min-width:1000px)": {
        fontSize: "14px",
      },
      "@media (min-width:1500px)": {
        fontSize: "14px",
      },
    },
    body2: {
      fontSize: "14px",
      fontWeight: 400,
      "@media (min-width:500px)": {
        fontSize: "14px",
      },
      "@media (min-width:1000px)": {
        fontSize: "14px",
      },
      "@media (min-width:1500px)": {
        fontSize: "14px",
      },
    },
  },
});

export default theme;
