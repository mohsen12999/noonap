import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import { IAppState } from "../../reducers/app";
import { IShopState, ICartState } from "../../reducers/shop";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import { PRODUCT_LIST, IProductSpecific } from "../../actions/shop";

const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    mainTitle: {
      fontFamily: "Yekan"
    },
    companyLink: {
      fontFamily: "Yekan",
      padding: "2px"
    },
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

interface ICheckoutProps {
  cart: ICartState;
  changePage: Function;
}

const Checkout: React.FC<ICheckoutProps> = (prop: ICheckoutProps) => {
  const classes = useStyles();

  const products: IProductSpecific[] = PRODUCT_LIST.map(pCart => {
    pCart.count =
      prop.cart === undefined || prop.cart[pCart.id] === undefined
        ? 0
        : prop.cart[pCart.id];
    return pCart;
  }).filter(p => p.count !== 0);

  return (
    <Container maxWidth="md">
      <h3 className={classes.mainTitle}>لیست سفارش ها</h3>
      {products.length === 0 ? (
        <Paper className={classes.root}>
          <Typography className={classes.myFont} variant="h5" component="h3">
            !سبد خرید خالی هست
          </Typography>
          <Typography className={classes.myFont} component="p">
            لطفاً کالا یا کالاهایی را انتخاب کنید.
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
      ) : (
        products.map(p => (
          <h4>
            {p.title} * {p.count}
          </h4>
        ))
      )}
    </Container>
  );
};

const mapStateToProps = (State: { app: IAppState; shop: IShopState }) => ({
  cart: State.shop.cart
});

const mapDispatchToProps = {
  // changePage: changePage
  changePage: (url: string) => push(url)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
