import React from "react";
import { Switch, Route } from "react-router";

import Main from "./pages/mainPage/main";
import NotFound from "./pages/notFound";
import About from "./pages/about";
import Product from "./pages/product";
import MainHeader from "./headers/main-header";
import Soon from "./pages/soon";
import Address from "./pages/address";
import Checkout from "./pages/checkout";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <MainHeader />
      <section>
        <Switch>
          <Route exact path={process.env.PUBLIC_URL + "/"} component={Main} />
          <Route
            exact
            path={process.env.PUBLIC_URL + "/about"}
            component={About}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + "/product/:id/:name"}
            component={(props: any) => <Product {...props} />}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + "/soon"}
            component={Soon}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + "/checkout"}
            component={Checkout}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + "/address"}
            component={Address}
          />
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
