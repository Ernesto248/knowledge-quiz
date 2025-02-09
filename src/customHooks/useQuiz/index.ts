import { useEffect, useState } from "react";
import {
  DifficultyType,
  Question,
  Quiz,
  QuestionAmountType,
} from "../../types/types.d";

interface Props {
  difficulty: DifficultyType;
  questionAmount: QuestionAmountType;
}

const useQuiz = ({ difficulty, questionAmount }: Props) => {
  const [quiz, setQuiz] = useState<Array<Question>>();
  const [randomIndexes, setRandomIndexes] = useState<number[]>([]);

  const getRandomIndexes = (indexesAmount: number, totalQuestions: number) => {
    const indexes: Set<number> = new Set();

    while (indexes.size < indexesAmount) {
      indexes.add(Math.floor(Math.random() * totalQuestions));
    }

    setRandomIndexes(Array.from(indexes));
  };

  const getQuiz = async () => {
    try {
      const response = await fetch(`./quiz/${difficulty}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Quiz = await response.json();

      const filteredQuestions: Question[] = data.questions.filter((_, index) =>
        randomIndexes.includes(index)
      );
      setQuiz(filteredQuestions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRandomIndexes(questionAmount, 50);
  }, [difficulty, questionAmount]);

  useEffect(() => {
    if (randomIndexes.length > 0) {
      getQuiz();
    }
  }, [randomIndexes]);

  return {
    quiz,
    generateRandomIndexes: () => getRandomIndexes(questionAmount, 50),
  };
};

export default useQuiz;
