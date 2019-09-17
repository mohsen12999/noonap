import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { push } from "connected-react-router";
import { connect } from "react-redux";
import { IAppState, AppPages } from "../../reducers/app";
import { IShopState } from "../../reducers/shop";

const useStyles = makeStyles({
  title: {
    textAlign: "center"
  },
  root: {
    flexGrow: 1,
    fontFamily: "Yekan"
  },
  tab: {
    fontFamily: "Yekan"
  },
  titleImg: {
    verticalAlign: "middle"
  }
});

interface IBigHeaderProps {
  tabId?: number;
  changePage: Function;
}

const BigHeader: React.FC<IBigHeaderProps> = (prop: IBigHeaderProps) => {
  const classes: any = useStyles();

  const [value, setValue] = React.useState(0);
  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  return (
    <div>
      <h2 className={classes.title}>
        <img
          className={classes.titleImg}
          src={process.env.PUBLIC_URL + "/icon-48x48.png"}
          alt="logo"
        />
        نون
      </h2>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          // value={prop.tabId}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab
            className={classes.tab}
            label="صفحه اصلی"
            // href={process.env.PUBLIC_URL + "/"}
            onClick={() => prop.changePage(process.env.PUBLIC_URL + "/")}
          />
          <Tab
            className={classes.tab}
            label="ارتباط با ما"
            // href={process.env.PUBLIC_URL + "/about"}
            onClick={() =>
              prop.changePage(process.env.PUBLIC_URL + "/" + AppPages.ABOUT)
            }
          />
          {/* <Tab className={classes.tab} label="Item Three" /> */}
        </Tabs>
      </Paper>
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
)(BigHeader);
