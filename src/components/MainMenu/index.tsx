import { DifficultyType, QuestionAmountType } from "../../types/types.d"

interface Props {
    onClickDifficulty: (difficulty:DifficultyType)=>void
    onClickQuestionAmount: (questionAmount:QuestionAmountType)=>void
    startQuiz:()=>void
}
const MainMenu = ({onClickDifficulty, onClickQuestionAmount, startQuiz}:Props) => {

    const handleDifficultyClick = (e:React.MouseEvent<HTMLButtonElement>)=>{
        const value = e.currentTarget.value as DifficultyType
        if(!Object.values(DifficultyType).includes(value)){
            console.log("mal mi pana");
            
            return;
        }
        onClickDifficulty(value)
    }

    const handleQuestionAmountClick = (e:React.MouseEvent<HTMLButtonElement>)=>{
        const value = Number(e.currentTarget.value) as QuestionAmountType
        if(!Object.values(QuestionAmountType).includes(value)){
            console.log("mal mi pana");
            return;
        }
        onClickQuestionAmount(value)
    }

  return (
    <section>
        <button onClick={startQuiz}>Start Quiz</button>
        <ul className="flex flex-row gap-4">
            <li>
                <button value={DifficultyType.Easy} onClick={handleDifficultyClick}>Easy</button>    
            </li>
            <li>
                <button value={DifficultyType.Medium} onClick={handleDifficultyClick}>Medium</button>
            </li>
            <li>
                <button value={DifficultyType.Hard} onClick={handleDifficultyClick}>Hard</button>
            </li>
        </ul>
        <ul className="flex flex-row gap-4">
            <li>
                <button value={QuestionAmountType.Five} onClick={handleQuestionAmountClick}>5</button>
            </li>
            <li>
                <button value={QuestionAmountType.Ten} onClick={handleQuestionAmountClick}>10</button>
            </li>
            <li>
                <button value={QuestionAmountType.Fifteen} onClick={handleQuestionAmountClick}>15</button>
            </li>
            <li>
                <button value={QuestionAmountType.Twenty} onClick={handleQuestionAmountClick}>20</button>
            </li>
        </ul>
    </section>
  )
}

export default MainMenu