import { DifficultyType, QuestionAmountType } from "../../types/types.d";

interface Props {
  onClickDifficulty: (difficulty: DifficultyType) => void;
  onClickQuestionAmount: (questionAmount: QuestionAmountType) => void;
  startQuiz: () => void;
}

const MainMenu = ({
  onClickDifficulty,
  onClickQuestionAmount,
  startQuiz,
}: Props) => {
  const handleDifficultyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value as DifficultyType;
    if (!Object.values(DifficultyType).includes(value)) {
      console.log("mal mi pana");
      return;
    }
    onClickDifficulty(value);
  };

  const handleQuestionAmountClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const value = Number(e.currentTarget.value) as QuestionAmountType;
    if (!Object.values(QuestionAmountType).includes(value)) {
      console.log("mal mi pana");
      return;
    }
    onClickQuestionAmount(value);
  };

  return (
    <section className="bg-gray-800 text-white p-6 rounded-lg shadow-xl font-virgil transition-all duration-500 ease-in-out flex flex-col items-center gap-4">
      <button
        className="bg-blue-700 hover:bg-blue-600 active:scale-95 text-white py-3 px-6 rounded-lg text-lg font-bold transition-all duration-300 shadow-md"
        onClick={startQuiz}
      >
        🚀 Start Quiz
      </button>

      <div className="w-full text-center">
        <h2 className="text-lg font-semibold mb-2">Select Difficulty</h2>
        <ul className="flex flex-wrap justify-center gap-3">
          {Object.values(DifficultyType).map((difficulty) => (
            <li key={difficulty}>
              <button
                className="bg-gray-700 hover:bg-gray-600 active:scale-95 text-white py-2 px-5 rounded-lg transition-all duration-300 shadow-md"
                value={difficulty}
                onClick={handleDifficultyClick}
              >
                {difficulty}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full text-center">
        <h2 className="text-lg font-semibold mb-2">
          Select Number of Questions
        </h2>
        <ul className="flex flex-wrap justify-center gap-3">
          {[5, 10, 15, 20].map((amount) => (
            <li key={amount}>
              <button
                className="bg-gray-700 hover:bg-gray-600 active:scale-95 text-white py-2 px-5 rounded-lg transition-all duration-300 shadow-md"
                value={amount}
                onClick={handleQuestionAmountClick}
              >
                {amount}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default MainMenu;
