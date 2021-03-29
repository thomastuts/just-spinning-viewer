import { useChannel } from "@harelpls/use-pusher";
import { useEffect, useState } from "react";

import * as ebsApi from "../api/ebs.js";

export default function useActivePrize({ channelId }) {
  const [activePrize, setActivePrize] = useState(null);
  const channel = useChannel(channelId);

  useEffect(() => {
    if (channelId && channel) {
      (async () => {
        const getActivePrize = async () => {
          try {
            const activePrizeResponse = await ebsApi.getActivePrize(channelId);
            setActivePrize(activePrizeResponse.data);
          } catch (err) {
            setActivePrize(null);
          }
        };

        channel.bind("broadcast", (payload) => {
          if (payload.event === "activePrizeUpdate") {
            getActivePrize();
          }
        });
        await getActivePrize();
      })();
    }
  }, [channel, channelId]);

  return activePrize;
}
