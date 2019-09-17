import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PageCart from "./page-cart";

import { IAppState } from "../../../reducers/app";
import { IShopState } from "../../../reducers/shop";
import { connect } from "react-redux";

import { PRODUCT_GROUPS, IProductGroup } from "../../../actions/shop";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  grid: {
    paddingTop: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  link: {
    textDecoration: "none"
  }
}));

interface IMainProps {
  // tabId?: number;
  // changeTabId: Function;
}

const Main: React.FC<IMainProps> = (prop: IMainProps) => {
  const classes = useStyles();

  // useEffect(() => {
  //   prop.changeTabId(0);
  // });

  // console.log(prop.tabId);

  const groups: IProductGroup[] = PRODUCT_GROUPS;

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
          <Grid key={group.id} item xs={12} sm={6}>
            <a
              className={classes.link}
              href={
                group.enable
                  ? "/product/" + group.id + "/" + group.title
                  : "/soon"
              }
            >
              <PageCart
                title={group.persianTitle}
                subtitle={group.persianSubtitle}
                img={group.img}
              />
            </a>
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
