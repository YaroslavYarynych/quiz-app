export interface Question {
  id: number;
  question: string;
  answer: string;
  reward: number;
}

export interface Answer {
  answer_id: number;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
}

export type InitialState = {
  passedQuestions: number | null;
  currentQuestionId: number;
  currentReward: number;
  isResult: boolean;
};
