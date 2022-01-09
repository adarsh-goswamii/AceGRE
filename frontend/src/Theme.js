import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "40em", // 640px
  md: "52em", // 832px
  lg: "64em", // 1024px
  xl: "80em", // 1280px 
});

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  }, 
  colors: {
    black: "#1B1B1B",
    white: "#F0F0F0", 
    dark_blue: "#2E2E48", 
    grey: "#dddddd", 
  },
  fonts: {
    poppins: 'poppins-regular',
    regular: 'poppins-regular',
    lemon: 'lemon', 
    bolder: 'poppins-bolder', 
    bold: 'poppins-bold', 
    semibold: 'poppins-semibold', 
    light: 'poppins-light', 
    black: 'poppins-black', 
    medium: 'poppins-medium'
  },
  breakpoints,
  shadows: { outline: "0 !important" }
});

export default theme;
