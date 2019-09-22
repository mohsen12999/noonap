import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PageCart from "./mainPage/page-cart";

import { IAppState } from "../../reducers/app";
import { IShopState } from "../../reducers/shop";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { MarketsGroups, IMarketGroup } from "../../actions/shop";

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

interface IMarketProps {
  // tabId?: number;
  // changeTabId: Function;
  changePage: Function;
}

const Market: React.FC<IMarketProps> = (prop: IMarketProps) => {
  const classes: any = useStyles();

  // useEffect(() => {
  //   prop.changeTabId(0);
  // });

  // console.log(prop.tabId);

  const groups: IMarketGroup[] = MarketsGroups;

  return (
    <Container maxWidth="md">
      <Grid
        className={classes.grid}
        container
        spacing={3}
        justify="space-around"
        alignItems="stretch"
      >
        {groups.map(group => (
          <Grid
            className={classes.littleGrid}
            key={group.id}
            item
            xs={12}
            sm={6}
            onClick={() =>
              prop.changePage(
                group.enable
                  ? "/product/" + group.id + "/" + group.title
                  : "/soon"
              )
            }
          >
            {/* <a
              className={classes.link}
              href={
                group.enable
                  ? "/product/" + group.id + "/" + group.title
                  : "/soon"
              }
            > */}
            <PageCart
              title={group.persianTitle}
              subtitle={
                group.persianSubtitle != undefined ? group.persianSubtitle : ""
              }
              img={group.img}
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
