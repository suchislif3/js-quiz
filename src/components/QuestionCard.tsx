import React, { useEffect } from "react";
import { UserAnswerObject } from "../common/types";
import {
  AnswerButton,
  Container,
  QuestionNr,
  Question,
} from "../styles/QuestionCard.styles";

interface Props {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswerObject: UserAnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswerObject,
  questionNr,
  totalQuestions,
}) => {

useEffect(() => {
  console.log('QUESTION CARD RENDER')

  return () => {console.log('LEAVING DOM')}
},)

return (
  <Container>
    <QuestionNr className="questionNr">
      Question: {questionNr} / {totalQuestions}
    </QuestionNr>
    <Question dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer) => (
        <AnswerButton
          key={answer}
          disabled={Boolean(userAnswerObject)}
          value={answer}
          onClick={callback}
          correct={userAnswerObject?.correctAnswer === answer}
          userClicked={userAnswerObject?.answer === answer}
        >
          <span dangerouslySetInnerHTML={{ __html: answer }} />
        </AnswerButton>
      ))}
    </div>
  </Container>
)};

export default QuestionCard;
