import React from "react";
import "./App.css";
import Navbar from "./Navbar";
import { Switch, Route } from "react-router";
import Main from "./Main";
import NotFound from "./NotFound";
import About from "./About";

const App: React.FC = () => {
  return (
    <div className="App">
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
