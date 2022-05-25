import { ThemeInterface } from "../../common/interfaces";
import { dark } from "./dark";

export const light: ThemeInterface = {
  ...dark,
  palette: {
    ...dark.palette,
    background: {
      main: "#f0f0f0",
      contrastText: "#2e2e2e",
    },
  },
};
