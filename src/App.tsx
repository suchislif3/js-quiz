import React, { useState } from "react";
import { ThemeProvider } from "styled-components";

import { defaultTheme } from "./themes/defaultTheme";
import { GlobalStyles } from "./App.styles";
import { fetchQuestions } from "./api/opentdb";
import { QuestionObject, UserAnswerObject } from "./common/types";
import { DifficultyEnum } from "./common/enums";
import QuestionCard from "./components/QuestionCard";

const TOTAL_QUESTIONS: number = 10;

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionObject[]>([]);
  const [questionNr, setQuestionNr] = useState<number>(0);
  const [userAnswerObjects, setUserAnswerObjects] = useState<UserAnswerObject[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);

  const resetGame = (): void => {
    setGameOver(false);
    setQuestionNr(0);
    setUserAnswerObjects([]);
    setScore(0);
  };

  const startTrivia = async (): Promise<void> => {
    try {
      setLoading(true);
      resetGame();
      const newQuestions: QuestionObject[] = await fetchQuestions(
        TOTAL_QUESTIONS,
        DifficultyEnum.EASY
      );
      setQuestions(newQuestions);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (!gameOver) {
      const userAnswer: string = e.currentTarget.value;
      const correct: boolean =
        questions[questionNr].correct_answer === userAnswer;
      if (correct) setScore((prev) => prev + 1);
      const userAnswerObject: UserAnswerObject = {
        question: questions[questionNr].question,
        answer: userAnswer,
        correct,
        correctAnswer: questions[questionNr].correct_answer,
      };
      setUserAnswerObjects((prev) => [...prev, userAnswerObject]);
    }
  };

  const nextQuestion = (): void => {
    const nextQuestionNr: number = questionNr + 1;

    if (nextQuestionNr === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setQuestionNr(nextQuestionNr);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <div className="App">
        <h1>React Quiz</h1>
        {(gameOver || userAnswerObjects.length === TOTAL_QUESTIONS) && (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        )}
        {!gameOver && <p className="score">Score: {score}</p>}
        {loading && <p>Loading Questions...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={questionNr + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[questionNr].question}
            answers={questions[questionNr].answers}
            userAnswerObject={userAnswerObjects ? userAnswerObjects[questionNr] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
          !loading &&
          userAnswerObjects.length === questionNr + 1 &&
          questionNr !== TOTAL_QUESTIONS - 1 && (
            <button className="next" onClick={nextQuestion}>
              Next Question
            </button>
          )}
      </div>
    </ThemeProvider>
  );
};

export default App;
