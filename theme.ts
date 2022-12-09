import { extendTheme, theme } from "@chakra-ui/react";

export default extendTheme({
  colors: {
    primary: theme.colors.gray,
    secondary: theme.colors.blue,
    error: theme.colors.red,
    cards: theme.colors.messenger,

    buttons: {
      50: "#ffe2ec",
      100: "#ffb2c5",
      200: "#ff809e",
      300: "#fe4e77",
      400: "#fd2051",
      500: "#e40c38",
      600: "#b2042b",
      700: "#80001e",
      800: "#4e0011",
      900: "#1f0005",
    },
  },

  fonts: {
    body: "Poppins, sans-serif",
  },
});
