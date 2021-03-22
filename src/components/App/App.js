import { PusherProvider, usePusher } from "@harelpls/use-pusher";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams,
} from "react-router-dom";

import * as ebsApi from "../../api/ebs.js";
import useActivePrize from "../../hooks/useActivePrize.js";
import Dashboard from "../views/Dashboard/Dashboard.js";
import Viewer from "../views/Viewer/Viewer.js";

const pusherConfig = {
  clientKey: process.env.REACT_APP_PUSHER_CLIENT_KEY,
  cluster: "eu",
};

//window.Pusher.logToConsole = true;

const MainRouteContainer = () => {
  const { path, url } = useRouteMatch();
  const params = useParams();
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    (async () => {
      const channelResponse = await ebsApi.getChannel(params.channelName);
      setChannel(channelResponse.data);
    })();
  }, [params.channelName]);

  if (!channel) {
    return null;
  }

  return (
    <React.Fragment>
      <Route exact path={path}>
        <Viewer channel={channel} />
      </Route>
      <Route exact path={`${path}/dashboard`}>
        <Dashboard channel={channel} />
      </Route>
    </React.Fragment>
  );
};

const App = () => {
  return (
    <PusherProvider {...pusherConfig}>
      <Router>
        <Switch>
          <Route exact path="/">
            <p>No channel ID in URL.</p>
          </Route>
          <Route path="/:channelName">
            <MainRouteContainer />
          </Route>
        </Switch>
      </Router>
    </PusherProvider>
  );
};

export default App;
