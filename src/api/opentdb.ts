import { shuffleArray } from "../utils/shuffleArray";
import { FetchedQuestion, QuestionObject } from "../common/types";
import { DifficultyEnum } from "../common/enums";

const category = ''

export const fetchQuestions = async (
  amount: number,
  difficulty: DifficultyEnum
): Promise<QuestionObject[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question: FetchedQuestion): QuestionObject => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
