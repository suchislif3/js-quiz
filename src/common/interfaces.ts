export interface ThemeInterface {
  fonts: {
    main: string;
    title: string;
  };
  borderRadius: string;
  palette: {
    background: PaletteInterface;
    answer: {
      correct: string,
      wrong: string,
    }
    common: {
      black: string;
      white: string;
    };
    primary: PaletteInterface;
    secondary: PaletteInterface;
  };
}

export interface PaletteInterface {
  main: string;
  contrastText: string;
}
