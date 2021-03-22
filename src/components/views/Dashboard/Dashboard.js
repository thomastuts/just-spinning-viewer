import { useChannel } from "@harelpls/use-pusher";
import React, { useEffect, useState, useCallback } from "react";

import * as ebsApi from "../../../api/ebs.js";
import useActivePrize from "../../../hooks/useActivePrize.js";
import DebugJSON from "../../DebugJSON/DebugJSON.js";

const Dashboard = ({ channel }) => {
  const activePrize = useActivePrize({ channelId: channel.channel_id });
  const [queue, setQueue] = useState([]);
  const [isStartingPrize, setIsStartingPrize] = useState(false);
  const pusherChannel = useChannel(channel.channel_id);

  useEffect(() => {
    (async () => {
      if (channel.channel_id && pusherChannel) {
        fetchQueue();
        pusherChannel.bind("queueUpdate", fetchQueue);
      }
    })();
  }, [setQueue, channel.channel_id, pusherChannel]);

  const fetchQueue = useCallback(async () => {
    console.log("fetchQueue");
    try {
      const { data } = await ebsApi.getQueue(channel.channel_id);
      setQueue(data);
    } catch (err) {
      console.error("Error fetching queue:", err.response);
    }
  }, [channel.channel_id, setQueue]);

  const handleStartPrizeInQueue = useCallback(
    async (prizeId) => {
      setIsStartingPrize(true);
      try {
        await ebsApi.startPrize(channel.channel_id, prizeId);
        fetchQueue();
      } catch (err) {
        console.error("Error starting prize in queue:");
        console.log(err.response);
      } finally {
        setIsStartingPrize(false);
      }
    },
    [channel.channel_id, fetchQueue]
  );

  const handleFulfillActivePrize = useCallback(async () => {
    await ebsApi.fulfillPrize(channel.channel_id, activePrize.id);
  }, [channel, activePrize]);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Queue</h2>
      {queue.length === 0 && <p>No prizes in queue.</p>}
      {queue.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Viewer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {queue.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>{entry.viewer_id}</td>
                <td>
                  <button
                    disabled={isStartingPrize || activePrize}
                    onClick={() => handleStartPrizeInQueue(entry.id)}
                  >
                    START
                  </button>
                  <button>CANCEL</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>Active prize</h2>
      {isStartingPrize && <p>Starting prize...</p>}
      {!isStartingPrize && activePrize && (
        <React.Fragment>
          <DebugJSON data={activePrize} />
          <button onClick={handleFulfillActivePrize}>FULFILL</button>
        </React.Fragment>
      )}
    </div>
  );
};

export default Dashboard;
