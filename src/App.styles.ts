import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.fonts.main};
  }
  
  html {
    height: 100%;
  }
  
  body {
    background-size: cover;
    color: ${(props) => props.theme.palette.primary.main};
    display: flex;
    justify-content: center;
    padding: 0 20px;
  }
`;
