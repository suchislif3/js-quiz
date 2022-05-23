import "styled-components";

interface PaletteInterface {
  main: string;
  contrastText: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    fonts: {
      main: string;
    };
    borderRadius: string;
    palette: {
      common: {
        black: string;
        white: string;
      };
      primary: PaletteInterface;
      secondary: PaletteInterface;
    };
  }
}
