import { PusherProvider, usePusher } from "@harelpls/use-pusher";
import React, { useEffect, useState } from "react";
import queryString from "query-string";
import * as ebsApi from "../../api/ebs.js";
import Viewer from "../views/Viewer/Viewer.js";

const pusherConfig = {
  clientKey: process.env.REACT_APP_PUSHER_CLIENT_KEY,
  cluster: "eu",
};

//window.Pusher.logToConsole = true;

const App = () => {
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    (async () => {
      const { channel_id } = queryString.parse(window.location.search);

      if (!channel_id) {
        return;
      }

      try {
        const channelResponse = await ebsApi.getChannel(channel_id);
        setChannel(channelResponse.data);
      } catch (err) {}
    })();
  }, []);

  if (!channel) {
    return null;
  }

  return (
    <PusherProvider {...pusherConfig}>
      <Viewer channel={channel} />
    </PusherProvider>
  );
};

export default App;
