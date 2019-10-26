import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MarketCart from "./market-cart";

import { IAppState, AppPages } from "../../../reducers/app";
import { IShopState } from "../../../reducers/shop";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { loadData } from "../../../actions/shopActions";

import { IMarketPlus } from "../../../actions/shop";

const useStyles: any = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  grid: {
    paddingTop: theme.spacing(2)
  },
  littleGrid: { cursor: "pointer" },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  link: {
    textDecoration: "none"
  }
}));

interface IMatchParams {
  id?: string;
  name?: string;
}

interface IMarketProps extends RouteComponentProps<IMatchParams> {
  // tabId?: number;
  // changeTabId: Function;
  // dbInfo?: IDbInfo;
  loadDbInfo: boolean;
  markets: IMarketPlus[];

  changePage: Function;
  loadData: Function;
}

const Market: React.FC<IMarketProps> = (prop: IMarketProps) => {
  const classes: any = useStyles();

  const groupId: string | undefined = prop.match.params.id;
  // useEffect(() => {
  //   prop.changeTabId(0);
  // });

  // console.log(prop.tabId);

  React.useEffect(() => {
    // prop.changeTabId(0);
    if (prop.loadDbInfo === false) {
      prop.loadData();
    }
  }, [prop]);

  return (
    <Container maxWidth="md">
      <Grid
        className={classes.grid}
        container
        spacing={3}
        justify="space-around"
        alignItems="stretch"
      >
        {prop.markets.map((market: IMarketPlus) => (
          <Grid
            className={classes.littleGrid}
            key={market.id}
            item
            xs={12}
            sm={6}
            onClick={() =>
              prop.changePage(
                market.enabled
                  ? "/" +
                      AppPages.PRODUCT +
                      "/" +
                      market.id +
                      "/" +
                      market.title
                  : "/" + AppPages.SOON
              )
            }
          >
            <MarketCart
              title={market.persianTitle}
              subtitle={market.persianSubtitle}
              img={market.img}
              open={market.isOpen}
              address={market.address}
              discount={market.discount}
              freeDeliver={market.freeDeliver}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const mapStateToProps = (State: { app: IAppState; shop: IShopState }) => ({
  // cart: State.shop.cart
  // tabId: State.app.tabId,
  // dbInfo: State.shop.dbInfo,
  markets: State.shop.markets,
  loadDbInfo: State.shop.loadDbInfo
});

const mapDispatchToProps = {
  // changePage: changePage
  // changeTabId: changeTabId
  loadData,
  changePage: (url: string) => push(url)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Market);
