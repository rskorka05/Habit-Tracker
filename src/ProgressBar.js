import React, { useState, useEffect } from "react";
//import { firestore } from './config/firebase';

export default function ProgressBar({ habits }) {
  const [filled, setFilled] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const completedCount = habits.filter((habit) => habit.completed).length;
    const totalCount = habits.length;
    const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
    setFilled(completionPercentage);
  }, [habits]);

  useEffect(() => {
    if (filled < 100 && isRunning) {
      const timer = setTimeout(() => setFilled((prev) => prev + 2), 50);
      return () => clearTimeout(timer);
    }
  }, [filled, isRunning]);

  /*const allCompleted = habits.every((habit) => habit.completed);

  let message = '';

  if (filled === 0) {
    message = 'Your journey begins...';
  } else if (filled === 100) {
    message = allCompleted ? 'Congratulations! You completed all your tasks!' : 'You did it! Keep going!';
  }*/

  return (
    <div>
      <div className="progressbar">
        <div
          style={{
            height: "100%",
            width: `${filled}%`,
            backgroundColor: "#a66cff",
            transition: "width 0.5s",
          }}
        ></div>
        <span className="progressPercent">{filled.toFixed(2)}%</span>
      </div>
      {/*<button className="btn" onClick={() => setIsRunning(true)}>
        Run
        </button>*/}
    </div>
  );
}


