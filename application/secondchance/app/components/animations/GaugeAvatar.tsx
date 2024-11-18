'use client';

import { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface GaugeAvatarProps {
  /**
   * The score to be displayed on the circular progress bar.
   * Accepts values between 0 and 100.
   */
  score: number;
}

/**
 * GaugeAvatar Component
 *
 * A minimalist circular progress bar designed to represent a user's score visually.
 * The score animates from 0 to the provided value upon rendering or updating.
 *
 * Props:
 * - score: The numerical value to display on the progress bar.
 *
 * Features:
 * - Smooth animation from 0 to the target score.
 * - Customizable stroke width and colors for better visual clarity.
 * - Simple and clean design for compact UI integration.
 */
const GaugeAvatar = ({ score }: GaugeAvatarProps) => {
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
        strokeWidth={4}
        styles={buildStyles({
          rotation: 0.75,
          strokeLinecap: 'round',
          pathColor: '#16a34a',
          trailColor: '#bbf7d0',
        })}
      ></CircularProgressbarWithChildren>
    </div>
  );
};

export default GaugeAvatar;
