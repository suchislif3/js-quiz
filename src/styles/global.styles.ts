import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.fonts.main};
    border-radius: ${({ theme }) => theme.borderRadius};
  }
  
  html {
    height: 100%;
  }
  
  body {
    background-color: ${({ theme }) => theme.palette.background.main};
    color: ${({ theme }) => theme.palette.background.contrastText};
    display: flex;
    justify-content: center;
    padding: 0 20px;
  }
`;
