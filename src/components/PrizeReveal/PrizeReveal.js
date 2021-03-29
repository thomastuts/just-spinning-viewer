import React, { useEffect, useRef, useState } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

import WheelBasic from "../../images/wheel-basic.svg";

import sleep from "../../util/sleep.js";
import Audio from "../Audio/Audio.js";
import LegsOrHotdogsVisual from "../../images/game-visual-legs-hotdogs.svg";
import IcebreakerVisual from "../../images/game-visual-icebreaker.svg";
import PuttingItOnTheLineVisual from "../../images/game-visual-line.svg";
import ShootingBlanksVisual from "../../images/game-visual-shooting-blanks.svg";
import SlowBurnVisual from "../../images/game-visual-slow-burn.svg";
import video from "../../videos/wheel-spinning.webm";

import "./PrizeReveal.scss";
import Stack from "../Stack/Stack.js";

const CONFIG_BY_PRIZE_TYPE = {
  LEGS_OR_HOTDOGS_QUIZ: {
    humanizedName: "Legs or Hotdogs",
    visual: LegsOrHotdogsVisual,
    titleAudioId: "GameTitleLegsOrHotdogs",
  },
  ICEBREAKER: {
    humanizedName: "Icebreaker",
    visual: IcebreakerVisual,
    titleAudioId: "GameTitleIcebreaker",
  },
  GUESS_THE_WORD: {
    humanizedName: "Slow Burn",
    visual: SlowBurnVisual,
    titleAudioId: "GameTitleSlowBurn",
  },
  FILL_IN_THE_BLANK: {
    humanizedName: "Shooting Blanks",
    visual: ShootingBlanksVisual,
    titleAudioId: "GameTitleShootingBlanks",
  },
  ONELINER: {
    humanizedName: "Putting it on the Line",
    visual: PuttingItOnTheLineVisual,
    titleAudioId: "GameTitlePuttingItOnTheLine",
  },
};

const SECTIONS = {
  INTRO: "INTRO",
  PRIZE_REVEAL: "PRIZE_REVEAL",
  TONIGHTS_CONTESTANT: "TONIGHTS_CONTESTANT",
};

const PrizeReveal = ({ prize }) => {
  const [currentSection, setCurrentSection] = useState(SECTIONS.INTRO);

  const prizeConfig = CONFIG_BY_PRIZE_TYPE[prize.type];

  useEffect(() => {
    (async () => {
      await sleep(6500);
      setCurrentSection(SECTIONS.PRIZE_REVEAL);
      await sleep(7500);
      setCurrentSection(SECTIONS.TONIGHTS_CONTESTANT);
    })();
  }, []);

  const introSection = (
    <React.Fragment>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1.5, type: "spring" }}
      >
        <video height={window.innerHeight} autoPlay muted controls={false}>
          <source src={video} type="video/mp4" />
        </video>
        {/*<motion.img*/}
        {/*  initial={{ rotate: 0 }}*/}
        {/*  animate={{ rotate: [0, 360] }}*/}
        {/*  transition={{ delay: 4, ease: "linear", repeat: Infinity }}*/}
        {/*  src={WheelBasic}*/}
        {/*/>*/}
      </motion.div>
    </React.Fragment>
  );

  const prizeRevealSection = (
    <Stack vertical spacing="default">
      <img src={prizeConfig.visual} />
      <div className="prize-reveal__game-title">
        {prizeConfig.humanizedName}
      </div>
    </Stack>
  );

  const tonightsContestantSection = (
    <Stack vertical spacing="default">
      {/*<h2 className="prize-reveal__contestant-title">Tonight's contestant:</h2>*/}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 1.5, type: "spring" }}
      >
        <Stack vertical spacing="default">
          <img
            src={prize.viewer_profile_image_url}
            alt=""
            className="prize-reveal__contestant-avatar"
          />
          <h2 className="prize-reveal__contestant-name">
            {prize.viewer_display_name}
          </h2>
        </Stack>
      </motion.div>
    </Stack>
  );

  return (
    <React.Fragment>
      <AnimatePresence>
        {currentSection === SECTIONS.INTRO && (
          <motion.div
            className="section"
            key="intro"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ delay: 1, duration: 1.5, type: "spring" }}
          >
            {introSection}
            <Audio id="ShowOpener" volume={0.1} />
            <Audio id="SpinTheWheel" delay={2} />
          </motion.div>
        )}
        {currentSection === SECTIONS.PRIZE_REVEAL && (
          <motion.div
            className="section"
            key="reveal"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ delay: 2, duration: 1.5, type: "spring" }}
          >
            {prizeRevealSection}
            <Audio id="WellBePlaying" />
            <Audio id={prizeConfig.titleAudioId} delay={2} />
          </motion.div>
        )}
        {currentSection === SECTIONS.TONIGHTS_CONTESTANT && (
          <motion.div
            className="section"
            key="contestant"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ delay: 2, duration: 1.5, type: "spring" }}
          >
            {tonightsContestantSection}
            <Audio id="TonightsContestant" />
            <Audio id="ShowTime" delay={5} />
          </motion.div>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
};

export default PrizeReveal;
