import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import PageCart from "./page-cart";

import { IAppState, AppPages } from "../../../reducers/app";
import { IShopState } from "../../../reducers/shop";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { IDbInfo } from "../../../actions/shop";
import { loadData } from "../../../actions/shopActions";

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
  },
  progress: {
    margin: theme.spacing(2)
  },
  progressDiv: {
    textAlign: "center",
    marginTop: "3rem"
  },
  yekanFont: {
    fontFamily: "Yekan"
  }
}));

interface IMainProps {
  // tabId?: number;
  // changeTabId: Function;

  loadingDbInfo: boolean;
  dbInfo?: IDbInfo;

  loadData: Function;
  changePage: Function;
}

const Main: React.FC<IMainProps> = (prop: IMainProps) => {
  const classes: any = useStyles();

  React.useEffect(() => {
    // prop.changeTabId(0);
    if (prop.dbInfo === undefined) {
      prop.loadData();
    }
  },[prop]);

  // console.log(prop.tabId);

  return (
    <Container maxWidth="md">
      {prop.loadingDbInfo ? (
        <div className={classes.progressDiv}>
          <CircularProgress className={classes.progress} />
        </div>
      ) : prop.dbInfo === undefined ? (
        <div className={classes.progressDiv}>
          <h4 className={classes.yekanFont}>خطا در بارگذاری اطلاعات</h4>
          <Button
            className={classes.yekanFont}
            variant="contained"
            color="primary"
            onClick={() => prop.loadData()}
          >
            بارگزاری مجدد
          </Button>
        </div>
      ) : (
        <Grid
          className={classes.grid}
          container
          spacing={3}
          justify="space-around"
          alignItems="stretch"
        >
          {prop.dbInfo.groups.map(group => (
            <Grid
              className={classes.littleGrid}
              key={group.id}
              item
              xs={12}
              sm={6}
              onClick={() =>
                prop.changePage(
                  group.enabled
                    ? "/" + AppPages.MARKET + "/" + group.id + "/" + group.title
                    : "/" + AppPages.SOON
                )
              }
            >
              <PageCart
                title={group.persianTitle}
                subtitle={
                  group.persianSubtitle !== undefined
                    ? group.persianSubtitle
                    : ""
                }
                img={group.img}
              />
              {/* </a> */}
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

const mapStateToProps = (State: { app: IAppState; shop: IShopState }) => ({
  // cart: State.shop.cart
  tabId: State.app.tabId,
  loadingDbInfo: State.shop.loadingDbInfo,
  dbInfo: State.shop.dbInfo
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
)(Main);
