import React from "react";
import { Switch, Route } from "react-router";

import Main from "./pages/mainPage/Main";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import MainHeader from "./headers/main-header";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <MainHeader />
      <section>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </section>
      {/* <footer>
        <p>footer</p>
      </footer> */}
    </div>
  );
};

export default App;

// https://reacttraining.com/react-router/web/guides/basic-components

// https://github.com/material-components/material-components-web-react
// https://react-mdc.github.io/#/
