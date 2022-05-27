import { shuffleArray } from "../utils/shuffleArray";
import { Category, FetchedQuestion, QuestionObject } from "../common/types";

export const fetchCategories = async (): Promise<Category[]> => {
  const endpoint = "https://opentdb.com/api_category.php";
  const data = await (await fetch(endpoint)).json();
  return data.trivia_categories.sort((a: Category, b: Category) =>
    a.name.localeCompare(b.name)
  );
};

export const fetchQuestions = async (
  amount: number,
  difficulty: string | null,
  category: number | null
): Promise<QuestionObject[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}${
    category ? "&category=" + category : ""
  }${
    difficulty ? "&difficulty=" + difficulty.toLowerCase() : ""
  }&type=multiple`;

  const data = await (await fetch(endpoint)).json();
  if (data.response_code === 1)
    throw new Error(
      "Sorry, there are not enough questions available in the selected combination. Please reduce the number of total questions or change your selections."
    );

  return data.results.map(
    (question: FetchedQuestion): QuestionObject => ({
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    })
  );
};
