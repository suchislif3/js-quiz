import React, { useState } from "react";
import { ThemeProvider } from "styled-components";

import { fetchQuestions, DifficultyEnum, QuestionObject } from "./api/opentdb";
import { defaultTheme } from "./themes/defaultTheme";
import { GlobalStyles } from "./App.styles";

import QuestionCard from "./components/QuestionCard";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS: number = 10;

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionObject[]>([]);
  const [questionNr, setQuestionNr] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);

  const resetGame = (): void => {
    setGameOver(false);
    setQuestionNr(0);
    setUserAnswers([]);
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
      const answerObject: AnswerObject = {
        question: questions[questionNr].question,
        answer: userAnswer,
        correct,
        correctAnswer: questions[questionNr].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
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
        {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
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
            userAnswer={userAnswers ? userAnswers[questionNr] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
          !loading &&
          userAnswers.length === questionNr + 1 &&
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
