import { useState } from "react";
import MainMenu from "./components/MainMenu";
import useQuiz from "./customHooks/useQuiz";
import { DifficultyType, QuestionAmountType } from "./types/types.d";
import QuestionCard from "./components/QuestionCard";

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

  const handleScore = () => setScore(score + 1);

  const startQuiz = () => {
    setIsQuizStarted(true);
  };

  const { quiz, generateRandomIndexes } = useQuiz({
    difficulty,
    questionAmount,
  });

  const quitQuiz = () => {
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
    console.log(currentQuestion);
    if (currentQuestion < questionAmount - 1) {
      setCurrentQuestion(currentQuestion + 1);
      return;
    }
    alert("Quiz finished!");
    setCurrentQuestion(0);
    quitQuiz();
  };

  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen p-4 text-white transition-all duration-500 ease-in-out bg-gradient-to-b from-gray-800 to-gray-900 font-virgil">
      <h1 className="mb-6 text-3xl font-bold text-center shadow-lg md:text-5xl">
        🎓 Knowledge Quiz
      </h1>

      {isQuizStarted && quiz ? (
        <div className="w-full max-w-sm p-4 bg-gray-800 shadow-xl md:max-w-2xl md:p-6 rounded-2xl">
          <QuestionCard
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
    </main>
  );
}

export default App;
