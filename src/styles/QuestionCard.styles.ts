import styled from "styled-components";

export const Container = styled.div`
  width: 500px;
  max-width: 90vw;
  background-color: ${({ theme }) => `${theme.palette.primary.main}20`};
  padding: 20px 3%;
  border-top: 3px solid ${({ theme }) => theme.palette.primary.main};
  border-bottom: 3px solid ${({ theme }) => theme.palette.primary.main};
  /* box-shadow: 0px 2px 10px
    ${({ theme }) => `${theme.palette.background.contrastText}75`}; */
  transition: all 0.5s;
`;

export const QuestionNr = styled.p`
  color: ${({ theme }) => theme.palette.primary.main};
  margin: 0 0 30px 0;
  font-size: 1.2rem;
`;

export const Question = styled.p`
  color: ${({ theme }) => theme.palette.background.contrastText};
  margin: 0 0 20px 0;
  font-size: 1.2rem;
`;

type AnswerButtonProps = {
  correct: boolean;
  userClicked: boolean;
};

export const AnswerButton = styled.button<AnswerButtonProps>`
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;
  border: none;
  font-size: 1rem;
  width: 100%;
  height: 60px;
  margin: 5px 0;
  position: relative;
  color: ${({ theme }) => theme.palette.background.contrastText};
  background: ${({ theme, correct, userClicked }) =>
    correct
      ? theme.palette.answer.correct
      : userClicked
      ? theme.palette.answer.wrong
      : "none"};

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
    background-color: ${({ theme }) =>
      `${theme.palette.background.contrastText}20`};
  }
  :hover::after {
    opacity: ${({ disabled }) => !disabled && 0};
    transform: ${({ disabled }) => !disabled && "scale(0.1, 1)"};
  }
`;
