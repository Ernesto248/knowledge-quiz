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
    setDifficulty(DifficultyType.Medium);
    setQuestionAmount(QuestionAmountType.Ten);
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
    alert("quiz finished");
    setCurrentQuestion(0);
    quitQuiz();
  };

  return (
    <main className="w-full h-screen">
      <h1>Knowledge Quiz</h1>
      {isQuizStarted && quiz ? (
        <QuestionCard
          back={quitQuiz}
          question={quiz[currentQuestion].question}
          correctAnswer={quiz[currentQuestion].answer}
          onNextQuestion={handleNextQuestion}
          options={quiz[currentQuestion].options}
        />
      ) : (
        <MainMenu
          startQuiz={startQuiz}
          onClickDifficulty={handleClickDifficulty}
          onClickQuestionAmount={handleClickQuestionAmount}
        />
      )}
    </main>
  );
}

export default App;
