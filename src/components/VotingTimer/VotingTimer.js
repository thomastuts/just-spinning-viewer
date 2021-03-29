import React, { useEffect, useState } from "react";

import "./VotingTimer.scss";
import Audio from "../Audio/Audio.js";

const VotingTimer = () => {
  const [progressRingOffset, setProgressRingOffset] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const setProgressRingOffsetForPercentage = (percent) => {
    const circumference = 52 * 2 * Math.PI;
    const pct = percent / 100;
    const offset = circumference - pct * circumference;
    setProgressRingOffset(offset);
  };

  useEffect(() => {
    setInterval(() => {
      setTimeElapsed((time) => time + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    setProgressRingOffsetForPercentage(Math.min(100, (timeElapsed / 30) * 100));
  }, [timeElapsed]);

  const isVotingClosed = timeElapsed < 30;

  return (
    <div className="voting-timer">
      <Audio id="Timer" volume={0.3} fadeOnUnmount />

      <div className="voting-timer__text">
        {!isVotingClosed && (
          <div>
            Remaining time
            <br />
            to vote:
          </div>
        )}
        {isVotingClosed && <div>Voting closed!</div>}
      </div>
      {!isVotingClosed && (
        <div className="voting-timer__visual">
          <div className="voting-timer__remaining-time">{30 - timeElapsed}</div>
          <svg className="voting-timer__progress-ring" width="120" height="120">
            <circle
              className="voting-timer__progress-ring__circle"
              strokeWidth="6"
              style={{
                strokeDasharray: 52 * 2 * Math.PI,
                strokeDashoffset: progressRingOffset,
              }}
              fill="transparent"
              r="52"
              cx="60"
              cy="60"
            />
          </svg>
          <svg
            className="voting-timer__background-ring"
            width="120"
            height="120"
          >
            <circle
              className="voting-timer__background-ring__circle"
              strokeWidth="6"
              fill="transparent"
              r="52"
              cx="60"
              cy="60"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default VotingTimer;
