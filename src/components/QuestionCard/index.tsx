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

  const handleOnClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (isSelected) return;
    if (e.currentTarget.textContent !== null) {
      setSelectedAnswer(e.currentTarget.textContent);
      setIsSelected(true);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsSelected(false);
    onNextQuestion();
  };
  return (
    <section className="bg-amber-200 w-full h-full">
      <button onClick={back}>Back</button>
      <h2>{question}</h2>
      <ul className="flex flex-col w-1/2 h-1/2 m-5 border-2 border-black rounded-lg">
        {options.map((option, index) => (
          <li
            key={index}
            onClick={handleOnClick}
            className={`cursor-pointer border-2 border-black p-2 m-2 hover:bg-amber-300 w-1/2 my-5 ${
              selectedAnswer === option
                ? option === correctAnswer
                  ? "bg-green-500"
                  : "bg-red-500"
                : ""
            }`}
          >
            {option}
          </li>
        ))}
      </ul>
      <h3>Timer</h3>
      <button onClick={handleNextQuestion}>Next Question</button>
    </section>
  );
};

export default QuestionCard;
