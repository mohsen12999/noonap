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

import { Markets, IMarket, IOpenTime } from "../../../actions/shop";

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
  changePage: Function;
}

const Market: React.FC<IMarketProps> = (prop: IMarketProps) => {
  const classes: any = useStyles();

  const groupId: string | undefined = prop.match.params.id;
  // useEffect(() => {
  //   prop.changeTabId(0);
  // });

  // console.log(prop.tabId);

  const markets: IMarket[] = Markets.filter(
    m => m.marketGroupId === Number(groupId)
  );

  const date: Date = new Date();
  const hour: number = date.getHours() + date.getMinutes() / 60;

  return (
    <Container maxWidth="md">
      <Grid
        className={classes.grid}
        container
        spacing={3}
        justify="space-around"
        alignItems="stretch"
      >
        {markets.map(market => {
          const openTimes: IOpenTime | undefined =
            market.openTime[date.getDate()];
          const isOpen: boolean =
            openTimes === undefined
              ? false
              : (openTimes.firstTime.start >= hour &&
                  hour <= openTimes.firstTime.end) ||
                (openTimes.secoundTime !== undefined &&
                  openTimes.secoundTime.start >= hour &&
                  hour <= openTimes.secoundTime.end);
          return (
            <Grid
              className={classes.littleGrid}
              key={market.id}
              item
              xs={12}
              sm={6}
              onClick={() =>
                prop.changePage(
                  market.enable
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
                open={isOpen}
                address={market.address}
                discount={market.discount}
                freeDeliver={market.freeDeliver}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

const mapStateToProps = (State: { app: IAppState; shop: IShopState }) => ({
  // cart: State.shop.cart
  tabId: State.app.tabId
});

const mapDispatchToProps = {
  // changePage: changePage
  // changeTabId: changeTabId
  changePage: (url: string) => push(url)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Market);
