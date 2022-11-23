import { extendTheme } from "@chakra-ui/react";

const theme = {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  styles: {
    global: {
      body: {
        fontWeight: 500,
        fontFamily: "Inter, Avenir, Helvetica, Arial",
        lineHeight: "24px",
        minWidth: "320px",
      },
      "#root": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      },
      "h1, h2, h3, p": {
        fontSize: "revert",
        textAlign: "center",
      },
      hr: {
        width: "100%",
      },
      ".h1-title": {
        marginBottom: "20px",
      },
      ".label-error": {
        display: "flex",
        justifyContent: "space-between",
      },
      ".error-message": {
        color: "red.300",
        fontSize: "smaller",
      },
      ".button-group button": {
        width: "100px",
      },
    },
  },
};

export default extendTheme(theme);
