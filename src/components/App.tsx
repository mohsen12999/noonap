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
import Market from "./pages/marketPage/market";

import { push } from "connected-react-router";
import { connect } from "react-redux";
import { IAppState, AppPages } from "../reducers/app";
import { IShopState } from "../reducers/shop";

import "./App.css";

interface IAppProps {
  tabId?: number;
  changePage: Function;
}

const App: React.FC<IAppProps> = (prop: IAppProps) => {
  console.log("app:", prop.tabId);
  return (
    <div className="App">
      <MainHeader />
      <section>
        <Switch>
          <Route exact path={process.env.PUBLIC_URL + "/"} component={Main} />
          <Route
            exact
            path={process.env.PUBLIC_URL + "/" + AppPages.ABOUT}
            component={About}
          />
          <Route
            exact
            path={
              process.env.PUBLIC_URL + "/" + AppPages.MARKET + "/:id/:name"
            }
            component={(props: any) => <Market {...props} />}
          />
          <Route
            exact
            path={
              process.env.PUBLIC_URL + "/" + AppPages.PRODUCT + "/:id/:name"
            }
            component={(props: any) => <Product {...props} />}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + "/" + AppPages.SOON}
            component={Soon}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + "/" + AppPages.CHECKOUT}
            component={Checkout}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + "/" + AppPages.ADDRESS}
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

const mapStateToProps = (State: { app: IAppState; shop: IShopState }) => ({
  // cart: State.shop.cart
  tabId: State.app.pageId
});

const mapDispatchToProps = {
  // changePage: changePage
  changePage: (url: string) => push(url)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

// https://reacttraining.com/react-router/web/guides/basic-components

// https://github.com/material-components/material-components-web-react
// https://react-mdc.github.io/#/
