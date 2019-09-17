import React from "react";
import { connect } from "react-redux";

import { IAppState } from "../../reducers/app";
import { IShopState, ICartState } from "../../reducers/shop";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import { PRODUCT_LIST, IProductSpecific } from "../../actions/shop";

const useStyles = makeStyles({
  mainTitle: {
    fontFamily: "Yekan"
  },
  companyLink: {
    fontFamily: "Yekan",
    padding: "2px"
  }
});

interface ICheckoutProps {
  cart: ICartState;
}

const Checkout: React.FC<ICheckoutProps> = (prop: ICheckoutProps) => {
  const classes = useStyles();

  const products: IProductSpecific[] = PRODUCT_LIST.map(pCart => {
    pCart.count =
      prop.cart === undefined || prop.cart[pCart.id] === undefined
        ? 0
        : prop.cart[pCart.id];
    return pCart;
  });

  const products2: IProductSpecific[] = products.filter(p => p.count !== 0);

  console.log(products, products2);

  return (
    <Container maxWidth="md">
      <h3 className={classes.mainTitle}>لیست سفارش ها</h3>
      {products2.length === 0 ? (
        <h3>سبد خرید خالی هست</h3>
      ) : (
        products2.map(p => (
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
