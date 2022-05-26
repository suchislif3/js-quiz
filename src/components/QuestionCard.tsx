import React from "react";
import { UserAnswerObject, QuestionObject } from "../common/types";
import {
  Container,
  QuestionNr,
  QuestionProperty,
  Question,
} from "../styles/QuestionCard.styles";
import { Button } from "../styles/common.styles";

interface Props {
  questionObject: QuestionObject;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswerObject: UserAnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({
  questionObject,
  callback,
  userAnswerObject,
  questionNr,
  totalQuestions,
}) => (
  <Container>
    <QuestionNr>
      Question: {questionNr} / {totalQuestions}
    </QuestionNr>
    <QuestionProperty>Category: {questionObject.category}</QuestionProperty>
    <QuestionProperty>Difficulty: {questionObject.difficulty}</QuestionProperty>
    <Question dangerouslySetInnerHTML={{ __html: questionObject.question }} />
    <div>
      {questionObject.answers.map((answer) => (
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
