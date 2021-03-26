import React from "react";

import "./FillInTheBlank.scss";
import DebugJSON from "../../DebugJSON/DebugJSON.js";

import {
  MainContentGrid,
  PrizeDescription,
  PrizeTitle,
} from "../../shared-prize-components.js";
import Stack from "../../Stack/Stack.js";
import UserInput from "../../UserInput/UserInput.js";

const FillInTheBlank = ({ prize, channel }) => {
  return (
    <React.Fragment>
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
            votes={prize.metadata.votes.viewer.length}
            showVotes={prize.metadata.isVoteInProgress}
          />
        </MainContentGrid>
      </Stack>
    </React.Fragment>
  );
};

export default FillInTheBlank;
