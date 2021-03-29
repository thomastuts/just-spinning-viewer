import React from "react";

import "./FillInTheBlank.scss";
import Instructions from "../../Instructions/Instructions.js";

import {
  MainContentGrid,
  PrizeDescription,
  PrizeTitle,
} from "../../shared-prize-components.js";
import Stack from "../../Stack/Stack.js";
import UserInput from "../../UserInput/UserInput.js";

const FillInTheBlank = ({ prize, channel }) => {
  const hideMessages = !Boolean(prize.streamer_input && prize.viewer_input);

  return (
    <React.Fragment>
      <Instructions
        instructionsFor={
          prize.metadata.isVoteInProgress
            ? "chat"
            : `${channel.channel_display_name} and ${prize.viewer_display_name}`
        }
      >
        {!prize.metadata.isVoteInProgress && (
          <p>
            Type <strong>!s</strong> followed by your answer.
          </p>
        )}
        {prize.metadata.isVoteInProgress && (
          <p>
            Type <strong>!s 1</strong> to vote for{" "}
            {channel.channel_display_name}, and <strong>!s 2</strong> to vote
            for {prize.viewer_display_name}.
          </p>
        )}
      </Instructions>
      <Stack vertical spacing="default">
        <PrizeTitle>Firing blanks</PrizeTitle>
        <PrizeDescription>
          FILL IN THE BLANK, THEN THE AUDIENCE VOTES ON THEIR FAVORITE!
        </PrizeDescription>
        <MainContentGrid gridTemplateColumns="1fr 20vw 1fr">
          <UserInput
            avatar={channel.profile_image_url}
            displayName={channel.channel_display_name}
            message={prize.streamer_input}
            hideMessage={hideMessages}
            votes={prize.metadata.votes.streamer.length}
            showVotes={prize.metadata.isVoteInProgress}
          />
          <div className="blank-prompt">
            <div className="blank-prompt__content">{prize.metadata.prompt}</div>
            <div className="blank-prompt__attribution">
              Content by Cards Against Humanity
            </div>
          </div>
          <UserInput
            avatar={prize.viewer_profile_image_url}
            displayName={prize.viewer_display_name}
            message={prize.viewer_input}
            hideMessage={hideMessages}
            votes={prize.metadata.votes.viewer.length}
            showVotes={prize.metadata.isVoteInProgress}
          />
        </MainContentGrid>
      </Stack>
    </React.Fragment>
  );
};

export default FillInTheBlank;
