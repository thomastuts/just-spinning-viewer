import React from "react";

import {
  MainContentGrid,
  PrizeDescription,
  PrizeTitle,
} from "../../shared-prize-components.js";
import Stack from "../../Stack/Stack.js";
import UserInput from "../../UserInput/UserInput.js";
import QuestionIcon from "../../../images/question.png";

import "./Icebreaker.scss";

const Icebreaker = ({ prize, channel }) => {
  return (
    <Stack vertical spacing="default">
      <PrizeTitle>Icebreaker</PrizeTitle>
      <PrizeDescription>
        {prize.viewer_display_name} GETS TO ANSWER A QUESTION. Is their answer a
        good one? {channel.channel_display_name} will decide!
      </PrizeDescription>
      <br />
      <br />
      <br />
      <br />
      <MainContentGrid gridTemplateColumns="1fr 1fr">
        <div className="icebreaker-prompt">
          {prize.metadata.prompt}
          <img
            src={QuestionIcon}
            alt=""
            className="icebreaker-prompt__question-icon"
          />
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

export default Icebreaker;
