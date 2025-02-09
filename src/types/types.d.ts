export interface Question {
    id: number;
    question: string;
    options: string[];
    answer: string;
}

export interface Quiz {
    questions: Question[];
}

export enum DifficultyType {
    Easy = "easy",
    Medium = "medium",
    Hard = "hard"
}
export enum QuestionAmountType {
    Five = 5,
    Ten = 10,
    Fifteen = 15,
    Twenty = 20
}