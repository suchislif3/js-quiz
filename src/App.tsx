import React, { useEffect, useState, useRef } from "react";
import { ThemeProvider } from "styled-components";
import PulseLoader from "react-spinners/PulseLoader";
import { MdOutlineLightMode, MdOutlineModeNight } from "react-icons/md";

import { light } from "./styles/themes/light";
import { dark } from "./styles/themes/dark";
import { GlobalStyle } from "./styles/Global.styles";
import { MainContainer, Title, Score } from "./styles/App.styles";
import { Button } from "./styles/common.styles";
import { fetchCategories, fetchQuestions } from "./api/opentdb";
import { Category, QuestionObject, UserAnswerObject } from "./common/types";
import { DifficultyEnum } from "./common/enums";
import { ThemeInterface } from "./common/interfaces";
import { categoryAll } from "./common/constants";
import QuestionCard from "./components/QuestionCard";
import ToggleButton from "./components/ToggleButton";
import CustomSelect from "./components/CustomSelect";

const TOTAL_QUESTIONS: number = 10;

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuestionObject[]>([]);
  const [questionNr, setQuestionNr] = useState<number>(0);
  const [userAnswerObjects, setUserAnswerObjects] = useState<
    UserAnswerObject[]
  >([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);
  const [theme, setTheme] = useState<ThemeInterface>(dark);
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);
  const startBtnRef = useRef<HTMLButtonElement | null>(null);

  const toggleTheme = (): void => {
    setTheme((prev) => (prev === dark ? light : dark));
  };

  const resetGame = (): void => {
    setGameOver(false);
    setQuestionNr(0);
    setUserAnswerObjects([]);
    setScore(0);
  };

  useEffect(() => {
    const getCategories = async (): Promise<void> => {
      const data: Category[] = await fetchCategories();
      const allCategories: Category[] = [categoryAll, ...data];
      setCategories(allCategories);
      setSelectedCategory(categoryAll);
    };
    if (!categories) getCategories();
    setDifficulty(DifficultyEnum.ALL);
  }, [categories]);

  const startTrivia = async (): Promise<void> => {
    try {
      setLoading(true);
      resetGame();
      const newQuestions: QuestionObject[] = await fetchQuestions(
        TOTAL_QUESTIONS,
        difficulty === DifficultyEnum.ALL ? null : difficulty,
        selectedCategory
          ? selectedCategory?.id === categoryAll.id
            ? null
            : selectedCategory.id
          : null
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
  }, [userAnswerObjects]);

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
        <ToggleButton
          callback={toggleTheme}
          isDark={theme === dark}
          front={<MdOutlineLightMode />}
          back={<MdOutlineModeNight />}
        />
        <PulseLoader
          loading={loading}
          size={12}
          css={"margin: 50px auto;"}
          color={theme.palette.background.contrastText}
        />
        {!loading && !gameOver && (
          <>
            <Score>score: {score}</Score>
            <QuestionCard
              questionNr={questionNr + 1}
              totalQuestions={TOTAL_QUESTIONS}
              questionObject={questions[questionNr]}
              userAnswerObject={
                userAnswerObjects ? userAnswerObjects[questionNr] : undefined
              }
              callback={checkAnswer}
            />
            {userAnswerObjects.length === questionNr + 1 &&
              questionNr !== TOTAL_QUESTIONS - 1 && (
                <Button ref={nextBtnRef} onClick={nextQuestion}>
                  <span>Next Question</span>
                </Button>
              )}
          </>
        )}
        {(gameOver || userAnswerObjects.length === TOTAL_QUESTIONS) && (
          <>
            <span>Category:</span>
            <CustomSelect
              selected={selectedCategory}
              options={categories}
              setSelected={setSelectedCategory}
              getLabel={(option) => option.name}
            />
            <span>Difficulty:</span>
            <CustomSelect
              selected={difficulty}
              options={Object.values(DifficultyEnum)}
              setSelected={setDifficulty}
              getLabel={(option) => option}
            />
            <Button ref={startBtnRef} onClick={startTrivia}>
              <span>{userAnswerObjects.length ? "RESTART" : "START"}</span>
            </Button>
          </>
        )}
      </MainContainer>
    </ThemeProvider>
  );
};

export default App;
