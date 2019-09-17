import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import ViewModule from "@material-ui/icons/ViewModule";
import ImportantDevices from "@material-ui/icons/ImportantDevices";
// import { Link } from "react-router-dom";

import { push } from "connected-react-router";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { IAppState, AppPages } from "../../reducers/app";
import { IShopState } from "../../reducers/shop";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginLeft: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      fontFamily: "Yekan"
    },
    list: {
      width: 250
    },
    fullList: {
      width: "auto"
    },
    menuTitle: {
      textAlign: "right"
    }
  })
);

interface IMiniHeaderProps {
  changePage: Function;
}

const MiniHeader: React.FC<IMiniHeaderProps> = (prop: IMiniHeaderProps) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  type DrawerSide = "top" | "left" | "bottom" | "right";
  const toggleDrawer = (side: DrawerSide, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = (side: DrawerSide) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem
          button
          component={Button}
          // to={process.env.PUBLIC_URL + "/"}
          onClick={() => prop.changePage(process.env.PUBLIC_URL + "/")}
          key="main"
        >
          <ListItemIcon>
            <ViewModule />
          </ListItemIcon>
          <ListItemText className={classes.menuTitle} primary="صفحه اصلی" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          component={Button}
          // to={process.env.PUBLIC_URL + "/about"}
          onClick={() =>
            prop.changePage(process.env.PUBLIC_URL + "/" + AppPages.ABOUT)
          }
          key="about"
        >
          <ListItemIcon>
            <ImportantDevices />
          </ListItemIcon>
          <ListItemText className={classes.menuTitle} primary="درباره ما" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer("right", true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            نون
          </Typography>
          <IconButton edge="end" color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {sideList("right")}
      </Drawer>
    </div>
  );
};

const mapStateToProps = (State: { app: IAppState; shop: IShopState }) => ({
  // cart: State.shop.cart
});

const mapDispatchToProps = {
  // changePage: changePage
  changePage: (url: string) => push(url)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiniHeader);
