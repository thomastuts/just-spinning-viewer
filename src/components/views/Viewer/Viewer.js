import { useChannel } from "@harelpls/use-pusher";
import React, { useEffect, useState } from "react";

import useActivePrize from "../../../hooks/useActivePrize.js";
import DebugJSON from "../../DebugJSON/DebugJSON.js";
import PrizeReveal from "../../PrizeReveal/PrizeReveal.js";
import LegsOrHotdogQuiz from "../../prizes/LegsOrHotdogQuiz/LegsOrHotdogQuiz";

import "./Viewer.scss";

const PrizeComponentsByPrizeType = {
  LEGS_OR_HOTDOGS_QUIZ: LegsOrHotdogQuiz,
};

const REVEAL_MOCK_DATA = {
  id: 33,
  status: "IN_PROGRESS",
  channel_id: "24608449",
  type: "LEGS_OR_HOTDOGS_QUIZ",
  viewer_id: "452143390",
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

  useEffect(() => {
    if (pusherChannel) {
      pusherChannel.bind("prizeStartAnimation", (payload) => {
        setPrizeForReveal(payload);

        setTimeout(() => {
          setPrizeForReveal(null);
        }, 4500);
      });
    }
  }, [pusherChannel, setPrizeForReveal]);

  let mainContent = null;

  if (prizeForReveal) {
    mainContent = <PrizeReveal prize={prizeForReveal} />;
  } else {
    if (!activePrize) {
      return null;
    }

    const PrizeComponent = PrizeComponentsByPrizeType[activePrize.type];

    if (!PrizeComponent) {
      console.warn("No Prize component for", activePrize.type);
    }

    mainContent = <PrizeComponent prize={activePrize} />;
  }

  return <div className="viewer">{mainContent}</div>;
};

export default Viewer;
