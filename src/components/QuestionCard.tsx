import React from "react";
import { UserAnswerObject } from "../common/types";
import { Container, QuestionNr, Question } from "../styles/QuestionCard.styles";
import { Button } from "../styles/common.styles";

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
}) => (
  <Container>
    <QuestionNr className="questionNr">
      Question: {questionNr} / {totalQuestions}
    </QuestionNr>
    <Question dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer) => (
        <Button
          key={answer}
          disabled={Boolean(userAnswerObject)}
          value={answer}
          onClick={callback}
          answerBtn
          correct={userAnswerObject?.correctAnswer === answer}
          userClicked={userAnswerObject?.answer === answer}
        >
          <span dangerouslySetInnerHTML={{ __html: answer }} />
        </Button>
      ))}
    </div>
  </Container>
);

export default QuestionCard;
