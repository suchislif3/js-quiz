import styled from "styled-components";

export const ButtonDiv = styled.div`
  line-height: 50px;
  height: 50px;
  text-align: center;
  width: 250px;
  max-width: 90vw;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  margin: 5%;

  span {
    transition: all 0.3s;
  }

  ::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
    transition: all 0.3s;
    border-top: 1px solid
      ${({ theme }) => `${theme.palette.background.contrastText}80`};
    border-bottom: 1px solid
      ${({ theme }) => `${theme.palette.background.contrastText}80`};
    transform: scale(0.1, 1);
  }
  :hover span {
    letter-spacing: 2px;
  }
  :hover::before {
    opacity: 1;
    transform: scale(1, 1);
  }
  ::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    transition: all 0.3s;
    background-color: ${({ theme }) =>
      `${theme.palette.background.contrastText}20`};
  }
  :hover::after {
    opacity: 0;
    transform: scale(0.1, 1);
  }
`;
