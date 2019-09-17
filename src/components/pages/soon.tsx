import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import { IAppState } from "../../reducers/app";
import { IShopState } from "../../reducers/shop";
import { connect } from "react-redux";
import { push } from "connected-react-router";

const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
      margin: theme.spacing(3, 2)
    },
    myFont: {
      fontFamily: "Yekan"
    },
    btn: {
      fontFamily: "Yekan",
      textAlign: "left",
      margin: theme.spacing(1, 2)
    }
  })
);

interface ISoonProps {
  // tabId?: number;
  // changeTabId: Function;
  changePage: Function;
}

const Soon: React.FC<ISoonProps> = (prop: ISoonProps) => {
  const classes: any = useStyles();

  return (
    <Container maxWidth="sm">
      <Paper className={classes.root}>
        <Typography className={classes.myFont} variant="h5" component="h3">
          این بخش در حال ساخت می باشد.
        </Typography>
        <Typography className={classes.myFont} component="p">
          به زودی این بخش ساخته می شود و در دسترس قرار می گیرد
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
          onClick={() => prop.changePage(process.env.PUBLIC_URL + "/")}
        >
          بازگشت به صفحه اصلی
        </Button>
      </Paper>
    </Container>
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
)(Soon);
