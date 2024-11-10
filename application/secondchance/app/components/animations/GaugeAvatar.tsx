'use client';
import { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface GaugeAvatarProps {
  score: number;
}

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
