import { extendTheme, theme } from "@chakra-ui/react";

export default extendTheme({
  colors: {
    primary: theme.colors.gray,
    secondary: theme.colors.blue,
    custom: {
      salmon: "#ff8ea9",
      salmonHover: "#f9678a",
    },
  },

  fonts: {
    body: "Poppins, sans-serif",
  },
});
