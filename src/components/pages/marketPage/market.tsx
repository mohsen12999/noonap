import React from "react";
import { RouteComponentProps } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PageCart from "./page-cart";

import { IAppState, AppPages } from "../../../reducers/app";
import { IShopState } from "../../../reducers/shop";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { Markets, IMarket } from "../../../actions/shop";

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

  return (
    <Container maxWidth="md">
      <Grid
        className={classes.grid}
        container
        spacing={3}
        justify="space-around"
        alignItems="stretch"
      >
        {markets.map(market => (
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
            {/* <a
              className={classes.link}
              href={
                market.enable
                  ? "/product/" + market.id + "/" + market.title
                  : "/soon"
              }
            > */}
            <PageCart
              title={market.persianTitle}
              subtitle={
                market.persianSubtitle !== undefined
                  ? market.persianSubtitle
                  : ""
              }
              img={market.img}
            />
            {/* </a> */}
          </Grid>
        ))}
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
