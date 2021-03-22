import React from "react";
import classNames from "classnames";

import "./PlayerInstructions.scss";

const PlayerInstructions = ({ playerName, children, className }) => {
  return (
    <div className={classNames("player-instructions", className)}>
      <header>
        <strong>{playerName}</strong>, here's what to do:
      </header>
      {children}
    </div>
  );
};

export default PlayerInstructions;
