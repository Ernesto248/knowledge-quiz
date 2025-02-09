import { useState } from "react";

interface Props {
  back: () => void;
  question: string;
  options: Array<string>;
  correctAnswer: string;
  onNextQuestion: () => void;
}

const QuestionCard = ({
  back,
  question,
  options,
  correctAnswer,
  onNextQuestion,
}: Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const handleOnClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if (isSelected) return;
    const answer = e.currentTarget.textContent;
    if (answer) {
      setSelectedAnswer(answer);
      setIsSelected(true);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsSelected(false);
    onNextQuestion();
  };

  return (
    <section className="bg-gray-800 text-white w-full max-w-xs sm:max-w-md md:max-w-2xl mx-auto p-4 sm:p-6 rounded-lg shadow-2xl font-virgil transition-all duration-500 ease-in-out flex flex-col items-center">
      <button
        className="self-start bg-gray-700 hover:bg-gray-600 active:scale-95 text-white py-2 px-4 rounded-lg transition-all duration-300 shadow-md"
        onClick={back}
      >
        ⬅️ Main Menu
      </button>

      <h2 className="text-2xl sm:text-3xl font-bold text-center mt-4">
        {question}
      </h2>

      <ul className="w-full flex flex-col items-center gap-2 sm:gap-3 mt-6">
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

      <h3 className="text-lg sm:text-xl mt-6 font-semibold">⏳ Timer</h3>

      <button
        className="mt-4 bg-blue-700 hover:bg-blue-600 active:scale-95 text-white py-2 px-5 sm:py-3 sm:px-6 rounded-lg text-lg font-bold transition-all duration-300 shadow-md"
        onClick={handleNextQuestion}
      >
        Next Question ➡️
      </button>
    </section>
  );
};

export default QuestionCard;
