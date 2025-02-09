import { useState } from "react";
import MainMenu from "./components/MainMenu";
import useQuiz from "./customHooks/useQuiz";
import { DifficultyType, QuestionAmountType } from "./types/types.d";
import QuestionCard from "./components/QuestionCard";
import ResultModal from "./components/ResutlModal";

function App() {
  const [difficulty, setDifficulty] = useState<DifficultyType>(
    DifficultyType.Easy
  );
  const [questionAmount, setQuestionAmount] = useState<QuestionAmountType>(
    QuestionAmountType.Five
  );
  const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false);
  const [isQuizFinish, setIsQuizFinish] = useState<boolean>(false);

  const handleScore = () => setScore((prev) => prev + 1);

  const closeResultModal = () => {
    setIsResultModalOpen(false);
    quitQuiz();
  };

  const startQuiz = () => {
    setIsQuizStarted(true);
  };

  const { quiz, generateRandomIndexes } = useQuiz({
    difficulty,
    questionAmount,
  });

  const quitQuiz = () => {
    setIsQuizFinish(false);
    setIsQuizStarted(false);
    setCurrentQuestion(0);
    setDifficulty(DifficultyType.Easy);
    setQuestionAmount(QuestionAmountType.Five);
    generateRandomIndexes();
    setScore(0);
  };

  const handleClickDifficulty = (difficulty: DifficultyType) => {
    setDifficulty(difficulty);
  };

  const handleClickQuestionAmount = (questionAmount: QuestionAmountType) => {
    setQuestionAmount(questionAmount);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questionAmount - 1) {
      setCurrentQuestion((prev) => prev + 1);
      return;
    }
    setIsQuizFinish(true);
    setIsResultModalOpen(true);
    setCurrentQuestion(0);
  };

  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen p-4 text-white transition-all duration-500 ease-in-out bg-gradient-to-b from-gray-800 to-gray-900 font-virgil">
      <h1 className="mb-6 text-4xl font-bold text-center shadow-lg md:text-5xl lg:text-6xl">
        🎓 Knowledge Quiz
      </h1>

      {isQuizStarted && quiz ? (
        <div className="w-full max-w-sm p-4 bg-gray-800 shadow-xl md:max-w-2xl md:p-6 rounded-2xl">
          <QuestionCard
            isQuizFinish={isQuizFinish}
            score={score}
            handleScore={handleScore}
            back={quitQuiz}
            question={quiz[currentQuestion].question}
            correctAnswer={quiz[currentQuestion].answer}
            onNextQuestion={handleNextQuestion}
            options={quiz[currentQuestion].options}
          />
        </div>
      ) : (
        <div className="w-full max-w-sm p-4 bg-gray-800 shadow-md md:max-w-lg md:p-6 rounded-xl">
          <MainMenu
            startQuiz={startQuiz}
            onClickDifficulty={handleClickDifficulty}
            onClickQuestionAmount={handleClickQuestionAmount}
          />
        </div>
      )}

      {isResultModalOpen && (
        <ResultModal
          onClose={closeResultModal}
          score={score}
          totalQuestions={questionAmount}
        />
      )}
    </main>
  );
}

export default App;
