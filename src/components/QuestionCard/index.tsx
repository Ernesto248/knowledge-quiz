import { useEffect, useState } from "react";
import Score from "../Score";
import Timer from "../Timer";

interface Props {
  back: () => void;
  question: string;
  options: Array<string>;
  correctAnswer: string;
  score: number;
  handleScore: () => void;
  onNextQuestion: () => void;
  isQuizFinish: boolean;
}

const QuestionCard = ({
  back,
  question,
  options,
  correctAnswer,
  onNextQuestion,
  score,
  handleScore,
  isQuizFinish,
}: Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isTimerStarted, setIsTimerStarted] = useState<boolean>(true);
  const [initialTime, setInitialTime] = useState<number>(10);
  const [timerKey, setTimerKey] = useState<number>(0);

  useEffect(() => {
    if (isQuizFinish) {
      setIsTimerStarted(false);
    }
  }, [isQuizFinish]);

  const handleOnClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if (isSelected) return;
    const answer = e.currentTarget.textContent;
    if (answer) {
      setSelectedAnswer(answer);
      setIsSelected(true);
      setIsTimerStarted(false);
      if (answer === correctAnswer) handleScore();
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsSelected(false);
    setInitialTime(10);
    if (isQuizFinish) {
      setIsTimerStarted(false);
    } else {
      setIsTimerStarted(true);
    }
    setTimerKey((prev) => prev + 1);
    onNextQuestion();
  };

  return (
    <section className="flex flex-col items-center w-full max-w-xs p-4 mx-auto text-white transition-all duration-500 ease-in-out bg-gray-800 rounded-lg shadow-2xl sm:max-w-md md:max-w-2xl sm:p-6 font-virgil">
      <div className="flex flex-row items-center justify-between w-full">
        <button
          className="self-start px-4 py-2 text-white transition-all duration-300 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 active:scale-95"
          onClick={back}
        >
          ⬅️ Main Menu
        </button>
        <Score score={score} />
      </div>

      <h2 className="mt-4 text-2xl font-bold text-center sm:text-3xl">
        {question}
      </h2>

      <ul className="flex flex-col items-center w-full gap-2 mt-6 sm:gap-3">
        {options.map((option, index) => (
          <li
            key={index}
            onClick={handleOnClick}
            className={`text-white w-5/6 sm:w-3/4 text-center py-2 sm:py-3 px-4 rounded-lg border-2 border-gray-600 cursor-pointer transition-all duration-300 shadow-md text-base sm:text-lg font-semibold
              ${
                selectedAnswer === option
                  ? option === correctAnswer
                    ? "bg-blue-500 hover:bg-blue-400"
                    : "bg-red-500 hover:bg-red-400"
                  : "hover:bg-gray-700"
              }
              ${
                isSelected &&
                correctAnswer === option &&
                selectedAnswer !== correctAnswer
                  ? "bg-blue-500 hover:bg-blue-400"
                  : ""
              }`}
          >
            {option}
          </li>
        ))}
      </ul>

      <Timer
        key={timerKey}
        initialTime={initialTime}
        isTimerStarted={isTimerStarted}
      />

      <button
        className="px-5 py-2 mt-4 text-lg font-bold text-white transition-all duration-300 bg-blue-700 rounded-lg shadow-md hover:bg-blue-600 active:scale-95 sm:py-3 sm:px-6"
        onClick={handleNextQuestion}
      >
        Next Question ➡️
      </button>
    </section>
  );
};

export default QuestionCard;
