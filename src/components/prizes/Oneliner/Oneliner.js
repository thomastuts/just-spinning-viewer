import React from "react";
import QuestionIcon from "../../../images/question.png";

import DebugJSON from "../../DebugJSON/DebugJSON.js";
import {
  MainContentGrid,
  PrizeDescription,
  PrizeTitle,
} from "../../shared-prize-components.js";
import Stack from "../../Stack/Stack.js";
import UserInput from "../../UserInput/UserInput.js";

const Oneliner = ({ prize, channel }) => {
  const haveBothPlayersSubmitted = prize.streamer_input && prize.viewer_input;

  return (
    <Stack vertical spacing="default">
      <PrizeTitle>PUTTING IT ON THE LINE</PrizeTitle>
      <PrizeDescription>
        {channel.channel_display_name} AND {prize.viewer_display_name} COME UP
        WITH THEIR FUNNIEST ONELINER, THEN THE AUDIENCE VOTES ON THEIR FAVORITE!
      </PrizeDescription>
      <MainContentGrid gridTemplateColumns="1fr 1fr">
        <UserInput
          avatar={channel.profile_image_url}
          displayName={channel.channel_display_name}
          message={prize.streamer_input}
          hideMessage={!haveBothPlayersSubmitted}
          votes={prize.metadata.votes.streamer.length}
          showVotes={prize.metadata.isVoteInProgress}
        />
        <UserInput
          avatar={prize.viewer_profile_image_url}
          displayName={prize.viewer_display_name}
          message={prize.viewer_input}
          hideMessage={!haveBothPlayersSubmitted}
          votes={prize.metadata.votes.viewer.length}
          showVotes={prize.metadata.isVoteInProgress}
        />
      </MainContentGrid>
    </Stack>
  );
};

export default Oneliner;
