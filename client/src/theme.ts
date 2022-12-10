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
      },
      "#root": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
      ".truncate-text-parent": {
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
      },
      ".truncate-text": {
        width: "50px",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
      },
      ".theme-toggle": {
        width: "16px",
        height: "16px",
      },
      ".add-contact": {
        width: "16px",
        height: "16px",
      },
    },
  },
};

export default extendTheme(theme);
