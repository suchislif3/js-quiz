import { ThemeInterface } from "../../common/interfaces";

export const light: ThemeInterface = {
  fonts: {
    main: "'Inconsolata', monospace",
    title: "'Orbitron', sans-serif",
  },
  borderRadius: "0",
  palette: {
    background: {
      main: "#f0f0f0",
      contrastText: "#2e2e2e",
    },
    answer: {
      correct: "#50A971",
      wrong: "#de4949",
    },
    common: {
      black: "#000000",
      white: "#ffffff",
    },
    primary: {
      main: "#709fb0",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#7E88BC",
      contrastText: "#ffffff",
    },
  },
};
