interface Props {
  score: number;
  totalQuestions: number;
  onClose: () => void;
}

const ResultModal = ({ score, totalQuestions, onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray backdrop-blur-sm">
      <div className="w-11/12 max-w-md p-6 text-white transition-all duration-300 transform scale-95 bg-gray-800 rounded-lg shadow-xl hover:scale-100">
        <h2 className="mb-4 text-2xl font-bold text-center">📊 Quiz Results</h2>

        <p className="mb-4 text-lg text-center">
          You scored <span className="font-bold text-blue-400">{score}</span>{" "}
          out of{" "}
          <span className="font-bold text-green-400">{totalQuestions}</span>
        </p>

        <button
          onClick={onClose}
          className="w-full px-4 py-2 text-lg font-semibold text-white transition-all duration-300 bg-blue-700 rounded-lg shadow-md hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
