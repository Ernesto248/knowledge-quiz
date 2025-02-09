interface Props {
  score: number;
}

const Score = ({ score }: Props) => {
  return (
    <div className="px-3 py-1 text-xl font-bold text-white transition-all duration-300 transform bg-gray-800 border-2 border-gray-600 rounded-lg shadow-md sm:text-xl hover:scale-105">
      🏆 Score: <span className="text-blue-400">{score}</span>
    </div>
  );
};

export default Score;
