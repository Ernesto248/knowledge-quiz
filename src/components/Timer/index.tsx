import { useEffect, useState } from "react";

interface Props {
  initialTime: number;
  isTimerStarted: boolean;
}

const Timer = ({ initialTime, isTimerStarted }: Props) => {
  const [time, setTime] = useState<number>(initialTime);

  useEffect(() => {
    setTime(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (!isTimerStarted || time <= 0) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerStarted]);

  return (
    <div className="px-6 py-2 text-2xl font-bold text-white bg-gray-800 rounded-lg shadow-md">
      ⏳ {time} sec
    </div>
  );
};

export default Timer;
