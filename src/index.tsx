import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import store from "./store/Store";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById("root"));

// serviceWorker.unregister();
serviceWorker.register();