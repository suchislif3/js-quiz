import styled from "styled-components";

interface ButtonProps {
  answerBtn?: boolean;
  correct?: boolean;
  userClicked?: boolean;
}

export const Button = styled.button<ButtonProps>`
  cursor: ${({disabled}) => !disabled && "pointer"};
  user-select: none;
  transition: all 0.3s;
  border: none;
  font-size: ${({ answerBtn }) => (answerBtn ? "1rem" : "1.2rem")};
  width: ${({ answerBtn }) => (answerBtn ? "100%" : "200px")};
  max-width: 90vw;
  height: ${({ answerBtn }) => (answerBtn ? "60px" : "50px")};
  margin: ${({ answerBtn }) => (answerBtn ? "5px 0" : "5% 0")};
  position: relative;
  color: ${({ theme }) => theme.palette.background.contrastText};
  background: ${({ theme, correct, userClicked }) =>
    correct
      ? `${theme.palette.answer.correct}99`
      : userClicked
      ? `${theme.palette.answer.wrong}99`
      : "none"};

  span {
    letter-spacing: ${({ answerBtn }) => !answerBtn && "1px"};
    transition: all 0.3s;
  }

  :hover span {
    letter-spacing: ${({ answerBtn }) => !answerBtn && "2px"};
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
    transform: scale(0, 1);
  }

  :hover::before {
    opacity: ${({ disabled }) => !disabled && 1};
    transform: ${({ disabled }) => !disabled && "scale(1, 1)"};
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
    background-color: ${({ theme, correct, userClicked }) => !correct && !userClicked ?
      `${theme.palette.background.contrastText}20` : "transparent"};
  }

  :hover::after {
    opacity: ${({ disabled }) => !disabled && 0};
    transform: ${({ disabled }) => !disabled && "scale(0, 1)"};
  }
`;
