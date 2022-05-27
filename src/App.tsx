import React, { useEffect, useState, useRef } from "react";
import { ThemeProvider } from "styled-components";
import PulseLoader from "react-spinners/PulseLoader";
import { MdOutlineLightMode, MdOutlineModeNight } from "react-icons/md";

import { light } from "./styles/themes/light";
import { dark } from "./styles/themes/dark";
import { GlobalStyle } from "./styles/Global.styles";
import {
  MainContainer,
  Title,
  Score,
  RangeInputDiv,
} from "./styles/App.styles";
import { Button } from "./styles/common.styles";
import { fetchCategories, fetchQuestions } from "./api/opentdb";
import { Category, QuestionObject, UserAnswerObject } from "./common/types";
import { DifficultyEnum } from "./common/enums";
import { ThemeInterface } from "./common/interfaces";
import { categoryAll } from "./common/constants";
import QuestionCard from "./components/QuestionCard";
import ToggleButton from "./components/ToggleButton";
import CustomSelect from "./components/CustomSelect";
import Modal from "./components/Modal";

const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeInterface>(dark);
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [totalQuestions, setTotalQuestions] = useState<number>(8);
  const [questionObjects, setQuestionObjects] = useState<QuestionObject[]>([]);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [userAnswerObjects, setUserAnswerObjects] = useState<
    UserAnswerObject[]
  >([]);
  const [score, setScore] = useState<number>(0);
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const startBtnRef = useRef<HTMLButtonElement | null>(null);
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);
  const startNewBtnRef = useRef<HTMLButtonElement | null>(null);

  const toggleTheme = (): void => {
    setTheme((prev) => (prev === dark ? light : dark));
  };

  const resetGame = (): void => {
    setQuestionIndex(0);
    setUserAnswerObjects([]);
    setScore(0);
  };

  const showMessage = (message: string): void => {
    setMessage(message);
    setShowModal(true);
  };

  const hideMessage = (): void => {
    setShowModal(false);
    setMessage("");
  };

  useEffect(() => {
    try {
      const loadCategories = async (): Promise<void> => {
        const data: Category[] = await fetchCategories();
        const allCategories: Category[] = [categoryAll, ...data];
        setCategories(allCategories);
        setSelectedCategory(categoryAll);
      };
      if (!categories) loadCategories();
      setDifficulty(DifficultyEnum.ALL);
    } catch (err) {
      showMessage("Unable to load categories, please try again later.");
    }
  }, [categories]);

  const startTrivia = async (): Promise<void> => {
    try {
      setLoading(true);
      resetGame();
      const newQuestionObjects: QuestionObject[] = await fetchQuestions(
        totalQuestions,
        difficulty === DifficultyEnum.ALL ? null : difficulty,
        selectedCategory
          ? selectedCategory?.id === categoryAll.id
            ? null
            : selectedCategory.id
          : null
      );
      setQuestionObjects(newQuestionObjects);
      setShowQuestion(true);
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        showMessage(err.message);
      } else {
        showMessage("Unable to load questions, please try again later.");
      }
      setLoading(false);
    }
  };

  const scrollToRef = (
    ref: React.MutableRefObject<HTMLElement | null>
  ): void => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (startBtnRef.current) scrollToRef(startBtnRef);
    if (nextBtnRef.current) scrollToRef(nextBtnRef);
    if (startNewBtnRef.current) scrollToRef(startNewBtnRef);
  }, [userAnswerObjects]);

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const userAnswer: string = e.currentTarget.value;
    const correct: boolean =
      questionObjects[questionIndex].correct_answer === userAnswer;
    if (correct) setScore((prev) => prev + 1);
    const userAnswerObject: UserAnswerObject = {
      question: questionObjects[questionIndex].question,
      answer: userAnswer,
      correct,
      correctAnswer: questionObjects[questionIndex].correct_answer,
    };
    setUserAnswerObjects((prev) => [...prev, userAnswerObject]);
  };

  const nextQuestion = (): void => {
    setQuestionIndex((prev) => prev + 1);
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
        {!loading && showQuestion && (
          <>
            {userAnswerObjects.length === questionObjects.length && (
              <Button
                ref={startNewBtnRef}
                onClick={() => setShowQuestion(false)}
              >
                <span>START NEW</span>
              </Button>
            )}
            <Score>
              {userAnswerObjects.length === questionObjects.length && "Final "}
              score: {score} / {questionObjects.length}
            </Score>
            <QuestionCard
              questionNr={questionIndex + 1}
              totalQuestions={questionObjects.length}
              questionObject={questionObjects[questionIndex]}
              userAnswerObject={
                userAnswerObjects ? userAnswerObjects[questionIndex] : undefined
              }
              callback={checkAnswer}
            />
            {userAnswerObjects.length === questionIndex + 1 &&
              questionIndex !== questionObjects.length - 1 && (
                <Button ref={nextBtnRef} onClick={nextQuestion}>
                  <span>Next Question</span>
                </Button>
              )}
          </>
        )}
        {!loading && !showQuestion && (
          <>
            <CustomSelect
              selected={selectedCategory}
              options={categories}
              setSelected={setSelectedCategory}
              getLabel={(option) => option.name}
              name={"Category"}
            />
            <CustomSelect
              selected={difficulty}
              options={Object.values(DifficultyEnum)}
              setSelected={setDifficulty}
              getLabel={(option) => option}
              name={"Difficulty"}
            />
            <RangeInputDiv>
              <label htmlFor="amount">Total questions: {totalQuestions}</label>
              <input
                id="amount"
                type="range"
                min="5"
                max="10"
                step="1"
                value={totalQuestions}
                onChange={(e) => setTotalQuestions(Number(e.target.value))}
              />
            </RangeInputDiv>
            <Button ref={startBtnRef} onClick={startTrivia}>
              <span>START</span>
            </Button>
          </>
        )}
        {showModal && (
          <Modal onClose={hideMessage}>
            <p>{message}</p>
          </Modal>
        )}
      </MainContainer>
    </ThemeProvider>
  );
};

export default App;
