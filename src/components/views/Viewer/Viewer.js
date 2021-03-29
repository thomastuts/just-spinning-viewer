import { useChannel } from "@harelpls/use-pusher";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import * as ebsApi from "../../../api/ebs.js";

import useActivePrize from "../../../hooks/useActivePrize.js";
import AnimatedBackground from "../../AnimatedBackground/AnimatedBackground.js";
import Audio from "../../Audio/Audio.js";
import DebugJSON from "../../DebugJSON/DebugJSON.js";
import PrizeReveal from "../../PrizeReveal/PrizeReveal.js";
import FillInTheBlank from "../../prizes/FillInTheBlank/FillInTheBlank.js";
import GuessTheWord from "../../prizes/GuessTheWord/GuessTheWord.js";
import LegsOrHotdogQuiz from "../../prizes/LegsOrHotdogQuiz/LegsOrHotdogQuiz";
import Icebreaker from "../../prizes/Icebreaker/Icebreaker";
import Oneliner from "../../prizes/Oneliner/Oneliner.js";

import "./Viewer.scss";
import VotingTimer from "../../VotingTimer/VotingTimer.js";

const prizeComponentsByPrizeType = {
  LEGS_OR_HOTDOGS_QUIZ: LegsOrHotdogQuiz,
  ICEBREAKER: Icebreaker,
  GUESS_THE_WORD: GuessTheWord,
  FILL_IN_THE_BLANK: FillInTheBlank,
  ONELINER: Oneliner,
};

const REVEAL_MOCK_DATA = {
  id: 33,
  status: "IN_PROGRESS",
  channel_id: "24608449",
  type: "ONELINER",
  viewer_id: "452143390",
  viewer_display_name: "StreamingToolsmithTesting",
  viewer_profile_image_url:
    "https://static-cdn.jtvnw.net/jtv_user_pictures/accab0e4-863e-47fe-bd0c-d88d2159499f-profile_image-300x300.png",
  viewer_input: null,
  streamer_input: null,
  metadata: {
    image: "http://placekitten.com/800/800",
    winningOption: "hotdogs",
  },
};

const Viewer = ({ channel }) => {
  const activePrize = useActivePrize({ channelId: channel.channel_id });
  const [prizeForReveal, setPrizeForReveal] = useState(null);
  const pusherChannel = useChannel(channel.channel_id);

  //useEffect(() => {
  //  setPrizeForReveal(REVEAL_MOCK_DATA);
  //  setTimeout(() => {
  //    setPrizeForReveal(null);
  //  }, 24000);
  //}, []);

  useEffect(() => {
    if (pusherChannel) {
      pusherChannel.bind("broadcast", async (data) => {
        if (data.event === "activePrizeStart") {
          setPrizeForReveal(data.payload);

          setTimeout(() => {
            setPrizeForReveal(null);
          }, 24000);
        }
      });
    }
  }, [pusherChannel, setPrizeForReveal]);

  let mainContent = null;

  if (prizeForReveal) {
    mainContent = (
      <div key="reveal">
        <PrizeReveal prize={prizeForReveal} />
      </div>
    );
  } else if (activePrize) {
    const PrizeComponent = prizeComponentsByPrizeType[activePrize.type];

    if (!PrizeComponent) {
      console.warn("No Prize component for", activePrize.type);
    }

    mainContent = (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 2, type: "spring" }}
        key="prize"
      >
        <PrizeComponent prize={activePrize} channel={channel} />
      </motion.div>
    );
  }

  return (
    <div className="viewer">
      <div className="viewer__content">{mainContent}</div>
      {activePrize &&
        activePrize.metadata &&
        activePrize.metadata.isVoteInProgress && <VotingTimer />}
      <AnimatedBackground />
    </div>
  );
};

export default Viewer;
