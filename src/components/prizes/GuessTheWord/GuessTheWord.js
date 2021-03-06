import React, { useState, useRef, useEffect, useCallback } from "react";
import classNames from "classnames";

import "./GuessTheWord.scss";
import Instructions from "../../Instructions/Instructions.js";
import {
  MainContentGrid,
  PrizeDescription,
  PrizeTitle,
} from "../../shared-prize-components.js";
import Stack from "../../Stack/Stack.js";
import UserInput from "../../UserInput/UserInput.js";

const GuessTheWord = ({ prize, channel }) => {
  const intervalRef = useRef(null);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [amountOfRevealedLetters, setAmountOfRevealedLetters] = useState(0);

  const handleEndGame = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsGameFinished(true);
  }, [intervalRef]);

  useEffect(() => {
    setTimeout(() => {
      setAmountOfRevealedLetters((amount) => amount + 1);

      intervalRef.current = setInterval(() => {
        setAmountOfRevealedLetters((amount) => amount + 1);
      }, 4000);
    }, prize.metadata.revealInterval * 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [prize]);

  useEffect(() => {
    if (amountOfRevealedLetters === prize.metadata.letterRevealOrder.length) {
      handleEndGame();
    }
  }, [
    prize.metadata.letterRevealOrder.length,
    amountOfRevealedLetters,
    handleEndGame,
  ]);

  useEffect(() => {
    if (prize.status === "COMPLETED") {
      handleEndGame();
    }
  }, [prize.status, handleEndGame]);

  const revealedLetters = prize.metadata.letterRevealOrder.slice(
    0,
    amountOfRevealedLetters
  );

  return (
    <Stack vertical spacing="default">
      <Instructions
        instructionsFor={`${channel.channel_display_name} and ${prize.viewer_display_name}`}
      >
        <p>
          Type <strong>!s</strong> followed by your answer. You can guess
          multiple times!
        </p>
      </Instructions>
      <PrizeTitle>Slow burn</PrizeTitle>
      <PrizeDescription>
        GUESS THE WORD AS IT’S GRADUALLY REVEALED. FASTEST PLAYER WINS!
      </PrizeDescription>
      <MainContentGrid gridTemplateColumns="1fr 1.25fr 1fr">
        <UserInput
          avatar={channel.profile_image_url}
          displayName={channel.channel_display_name}
          message={prize.streamer_input}
        />
        <div
          className="word"
          style={{
            gridTemplateColumns: `repeat(${prize.metadata.word.length}, 1fr)`,
          }}
        >
          {prize.metadata.word.split("").map((letter) => (
            <div className="word__letter-container">
              <div
                className={classNames("word__letter", {
                  "word__letter--visible":
                    isGameFinished || revealedLetters.includes(letter),
                })}
              >
                {letter}
              </div>
            </div>
          ))}
        </div>
        <UserInput
          avatar={prize.viewer_profile_image_url}
          displayName={prize.viewer_display_name}
          message={prize.viewer_input}
        />
      </MainContentGrid>
    </Stack>
  );
};

export default GuessTheWord;
