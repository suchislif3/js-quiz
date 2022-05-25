import React, { useEffect, useState, useRef } from "react";
import { ThemeProvider } from "styled-components";
import PulseLoader from "react-spinners/PulseLoader";

import { light } from "./styles/themes/light";
import { dark } from "./styles/themes/dark";
import { GlobalStyle } from "./styles/Global.styles";
import { MainContainer, Title, Score } from "./styles/App.styles";
import { Button } from "./styles/common.styles";
import { fetchQuestions } from "./api/opentdb";
import { QuestionObject, UserAnswerObject } from "./common/types";
import { DifficultyEnum } from "./common/enums";
import { ThemeInterface } from "./common/interfaces";
import QuestionCard from "./components/QuestionCard";

const TOTAL_QUESTIONS: number = 10;

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionObject[]>([]);
  const [questionNr, setQuestionNr] = useState<number>(0);
  const [userAnswerObjects, setUserAnswerObjects] = useState<
    UserAnswerObject[]
  >([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);
  const [isDark] = useState<boolean>(true);
  const [theme, setTheme] = useState<ThemeInterface>(isDark ? dark : light);
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);
  const startBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setTheme(isDark ? dark : light);
  }, [isDark]);

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

  const scrollToRef = (
    ref: React.MutableRefObject<HTMLElement | null>
  ): void => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (nextBtnRef.current) scrollToRef(nextBtnRef);
    if (startBtnRef.current) scrollToRef(startBtnRef);
  });

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
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MainContainer>
        <Title>quiz</Title>

        {!gameOver && !loading && (
          <Score className="score">score: {score}</Score>
        )}
        <PulseLoader
          loading={loading}
          size={15}
          css={"margin: 50px auto;"}
          color={theme.palette.background.contrastText}
        />
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={questionNr + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[questionNr].question}
            answers={questions[questionNr].answers}
            userAnswerObject={
              userAnswerObjects ? userAnswerObjects[questionNr] : undefined
            }
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
          !loading &&
          userAnswerObjects.length === questionNr + 1 &&
          questionNr !== TOTAL_QUESTIONS - 1 && (
            <Button ref={nextBtnRef} onClick={nextQuestion}>
              <span>Next Question</span>
            </Button>
          )}
        {(gameOver || userAnswerObjects.length === TOTAL_QUESTIONS) && (
          <Button ref={startBtnRef} onClick={startTrivia}>
            <span>{userAnswerObjects.length ? "RESTART" : "START"}</span>
          </Button>
        )}
      </MainContainer>
    </ThemeProvider>
  );
};

export default App;
