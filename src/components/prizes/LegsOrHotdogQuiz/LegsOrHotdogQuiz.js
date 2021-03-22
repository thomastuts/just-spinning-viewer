import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import PlayerInstructions from "../../PlayerInstructions/PlayerInstructions.js";
import UserInput from "../../UserInput/UserInput.js";

import "./LegsOrHotdogQuiz.scss";

const LegsOrHotdogQuiz = ({ prize }) => {
  const [isShowingTutorial, setIsShowingTutorial] = useState(true);

  const haveBothPlayersVoted = prize.streamer_input && prize.viewer_input;

  return (
    <motion.div
      //initial={{ opacity: 0 }}
      //animate={{ opacity: 1 }}
      //transition={{ duration: 0.5 }}
      className="quiz-wrapper"
    >
      <motion.div
        //animate={{
        //  rotate: [0, 2, 0],
        //}}
        //transition={{ duration: 0.5, type: "spring", repeat: 3 }}
        className="quiz-title"
      >
        Are these legs or hotdogs?
      </motion.div>
      <motion.p
        className="quiz__help-text"
        //initial={{ opacity: 0 }}
        //animate={{ opacity: 1 }}
        //transition={{ duration: 0.5, delay: 2 }}
      >
        THE ANSWER WILL BE REVEALED WHEN BOTH PLAYERS HAVE VOTED
      </motion.p>
      <motion.div
        //initial={{ opacity: 0 }}
        //animate={{ opacity: 1 }}
        //transition={{ duration: 0.5, delay: 4 }}
        className="quiz__inputs-container"
      >
        <div className="quiz__input">
          <UserInput
            avatar="http://placekitten.com/800/800"
            displayName="StreamingToolsmith"
            message={prize.streamer_input}
            hideMessage={!haveBothPlayersVoted}
          />
        </div>
        <div className="quiz__image-container">
          <img src={prize.metadata.image} alt="" className="quiz__image" />
          {haveBothPlayersVoted && (
            <div className="quiz__answer">{prize.metadata.winningOption}</div>
          )}
        </div>
        <div className="quiz__input">
          <UserInput
            avatar="http://placekitten.com/800/800"
            displayName="StreamingToolsmith"
            message={prize.viewer_input}
            hideMessage={!haveBothPlayersVoted}
          />
        </div>
      </motion.div>
      <motion.div
      //animate={{
      //  scale: [1, 0.9, 1.1, 1],
      //  //rotate: [0, 0, 270, 270, 0],
      //  //borderRadius: ["20%", "20%", "50%", "50%", "20%"],
      //}}
      //transition={{ repeat: 2, duration: 0.7, delay: 6 }}
      >
        <motion.div
        //initial={{ opacity: 0 }}
        //animate={{ opacity: 1 }}
        //transition={{ duration: 0.5, delay: 6 }}
        >
          <PlayerInstructions playerName="Shroud">
            <p>
              Type <strong>!s legs</strong> or <strong>!s hotdogs</strong> to
              vote.
            </p>
          </PlayerInstructions>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LegsOrHotdogQuiz;
