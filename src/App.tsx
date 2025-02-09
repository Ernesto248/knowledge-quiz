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

  const startQuiz = () => {
    setIsQuizStarted(true);
  };

  const quitQuiz = () => {
    setIsQuizStarted(false);
    setCurrentQuestion(0);
    setDifficulty(DifficultyType.Easy);
    setQuestionAmount(QuestionAmountType.Five);
  };

  const { quiz } = useQuiz({ difficulty, questionAmount });

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
    <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 text-white font-virgil transition-all duration-500 ease-in-out p-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center shadow-lg">
        🎓 Knowledge Quiz
      </h1>

      {isQuizStarted && quiz ? (
        <div className="w-full max-w-sm md:max-w-2xl bg-gray-800 p-4 md:p-6 rounded-2xl shadow-xl">
          <QuestionCard
            back={quitQuiz}
            question={quiz[currentQuestion].question}
            correctAnswer={quiz[currentQuestion].answer}
            onNextQuestion={handleNextQuestion}
            options={quiz[currentQuestion].options}
          />
        </div>
      ) : (
        <div className="w-full max-w-sm md:max-w-lg bg-gray-800 p-4 md:p-6 rounded-xl shadow-md">
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
