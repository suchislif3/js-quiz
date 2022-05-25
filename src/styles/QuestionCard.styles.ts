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
