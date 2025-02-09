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
    <section>
      <button onClick={startQuiz}>Start Quiz</button>
      <ul className="flex flex-row gap-4">
        {Object.values(DifficultyType).map((difficulty) => (
          <li key={difficulty}>
            <button value={difficulty} onClick={handleDifficultyClick}>
              {difficulty}
            </button>
          </li>
        ))}
      </ul>
      <ul className="flex flex-row gap-4">
        {/* Object.values(QuestionAmountType) returns a bidirectional object with keys and values */}
        {[5, 10, 15, 20].map((amount) => (
          <li key={amount}>
            <button value={amount} onClick={handleQuestionAmountClick}>
              {amount}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MainMenu;
