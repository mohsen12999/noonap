import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";

import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./store/configureStore";

const store = configureStore({} /* provide initial state if any */);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {/* place ConnectedRouter under Provider */}
      <>
        {/* your usual react-router v4/v5 routing */}
        {/* <Switch>
          <Route exact path="/" render={() => (<div>Match</div>)} />
          <Route render={() => (<div>Miss</div>)} />
        </Switch>*/}
        <App />
      </>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// serviceWorker.unregister();
serviceWorker.register();
