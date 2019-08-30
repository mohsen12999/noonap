import React from "react";
import { Switch, Route } from "react-router";

import Main from "./Main";
import NotFound from "./NotFound";
import About from "./About";
import MainHeader from "./headers/main-header";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <MainHeader />
      <header className="App-header">
        <h3>app name</h3>
      </header>
      <nav>
        <Navbar />
      </nav>
      <section>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </section>
      <footer>
        <p>footer</p>
      </footer>
    </div>
  );
};

export default App;

// https://reacttraining.com/react-router/web/guides/basic-components

// https://github.com/material-components/material-components-web-react
// https://react-mdc.github.io/#/
