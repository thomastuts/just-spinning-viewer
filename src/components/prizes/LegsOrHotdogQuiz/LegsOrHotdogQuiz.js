import React from "react";

import Instructions from "../../Instructions/Instructions.js";
import {
  MainContentGrid,
  PrizeDescription,
  PrizeTitle,
} from "../../shared-prize-components.js";
import Stack from "../../Stack/Stack.js";
import UserInput from "../../UserInput/UserInput.js";

import "./LegsOrHotdogQuiz.scss";

const LegsOrHotdogQuiz = ({ prize, channel }) => {
  const haveBothPlayersVoted = prize.streamer_input && prize.viewer_input;

  return (
    <Stack vertical spacing="default">
      <Instructions
        instructionsFor={`${channel.channel_display_name} and ${prize.viewer_display_name}`}
      >
        <p>
          Type <strong>!s legs</strong> or <strong>!s hotdogs</strong>.
        </p>
      </Instructions>
      <PrizeTitle>LEGS OR HOTDOGS?</PrizeTitle>
      <PrizeDescription>
        THE ANSWER WILL BE REVEALED WHEN BOTH PLAYERS HAVE VOTED!
      </PrizeDescription>
      <MainContentGrid gridTemplateColumns="1fr 1fr 1fr">
        <UserInput
          avatar={channel.profile_image_url}
          displayName={channel.channel_display_name}
          message={prize.streamer_input}
          hideMessage={!haveBothPlayersVoted}
        />
        <div className="quiz__image-container">
          <img src={prize.metadata.image} alt="" className="quiz__image" />
          {haveBothPlayersVoted && (
            <div className="quiz__answer">{prize.metadata.winningOption}</div>
          )}
        </div>
        <UserInput
          avatar={prize.viewer_profile_image_url}
          displayName={prize.viewer_display_name}
          message={prize.viewer_input}
          hideMessage={!haveBothPlayersVoted}
        />
      </MainContentGrid>
    </Stack>
  );
};

export default LegsOrHotdogQuiz;
