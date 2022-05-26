export type UserAnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

export type FetchedQuestion = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type QuestionObject = FetchedQuestion & { answers: string[] };

export type Category = {
  id: number;
  name: string;
};
