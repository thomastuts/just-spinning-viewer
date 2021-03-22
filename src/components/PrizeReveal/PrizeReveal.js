import React, { useEffect, useRef } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import { Howl } from "howler";

import WheelBasic from "../../images/wheel-basic.svg";
import TimerAudio from "../../sounds/mixkit-game-show-happy-timer-666.wav";
import RevealAudio from "../../sounds/mixkit-revealing-bonus-notification-958.wav";

import "./PrizeReveal.scss";

const obj = { foo: "bar", baz: "quz" };

const humanizedPrizeNames = {
  LEGS_OR_HOTDOGS_QUIZ: "Legs or Hotdogs",
};

const PrizeReveal = ({ prize }) => {
  const audio = useRef({
    timer: new Howl({
      src: [TimerAudio],
    }),
    reveal: new Howl({
      src: [RevealAudio],
    }),
  });

  useEffect(() => {
    audio.current.timer.play();

    setTimeout(() => {
      audio.current.timer.fade(1, 0, 1000);
      setTimeout(() => {
        audio.current.reveal.play();
      }, 600);
    }, 2500);

    return () => {
      if (audio.current) {
        Object.values(audio.current).forEach((sound) => {
          sound.stop();
        });
      }
    };
  }, []);

  return (
    <div className="prize-reveal">
      {/*<p>Spinning the wheel...</p>*/}
      <motion.p
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5 }}
        className="prize-reveal__announce"
      >
        StreamingToolsmith's prize is...
      </motion.p>
      {/*<motion.div*/}
      {/*  initial={{ rotate: 0 }}*/}
      {/*  animate={{ rotate: 360 }}*/}
      {/*  transition={{ duration: 2, repeat: 1 }}*/}
      {/*  className="wheelContainer"*/}
      {/*>*/}
      {/*  <WheelBasic />*/}
      {/*</motion.div>*/}

      <motion.p
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 3 }}
        className="prize-reveal__result"
      >
        {humanizedPrizeNames[prize.type]}!
      </motion.p>
    </div>
  );
};

export default PrizeReveal;
