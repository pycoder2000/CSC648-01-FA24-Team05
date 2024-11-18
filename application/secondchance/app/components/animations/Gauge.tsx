'use client';

import { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface GaugeProps {
  /**
   * The score to be displayed on the gauge.
   * Accepts values between 0 and 100.
   */
  score: number;
}

/**
 * Gauge Component
 *
 * A circular progress bar (gauge) component to visually represent a score.
 * The score animates from 0 to the provided value upon rendering or updating.
 *
 * Props:
 * - score: The target score to display in the gauge.
 *
 * Features:
 * - Smooth animation from 0 to the target score.
 * - Customizable styles, including colors and stroke width.
 * - Displays the score numerically inside the gauge, along with a "Score" label.
 */
const Gauge = ({ score }: GaugeProps) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const increment = score / 50;
    const interval = setInterval(() => {
      setDisplayScore((prev) => {
        if (prev + increment >= score) {
          clearInterval(interval);
          return score;
        }
        return prev + increment;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [score]);

  return (
    <div className="size-30 relative">
      <CircularProgressbarWithChildren
        value={displayScore}
        maxValue={100}
        strokeWidth={8}
        styles={buildStyles({
          rotation: 0.75,
          strokeLinecap: 'round',
          pathColor: '#16a34a',
          trailColor: '#bbf7d0',
        })}
      >
        <div className="text-center">
          <span className="text-2xl font-bold text-green-600 dark:text-green-500">
            {Math.round(displayScore)}
          </span>
          <span className="block text-green-600 dark:text-green-500">Score</span>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default Gauge;
