import React from "react";
import { connect } from "react-redux";

import { IAppState } from "../../reducers/app";
import { IShopState, ICartState } from "../../reducers/shop";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

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

  const cartQuantity = prop.cart;

  return (
    <Container maxWidth="md">
      <h3 className={classes.mainTitle}>درباره ما</h3>
      <p className={classes.mainTitle}>
        کلیه حقوق مادی و معنوی اپلیکیشن نون متعلق به شرکت
        <a
          className={classes.companyLink}
          href="http://www.apdr.ir"
          title="وب سایت شرکت کاوشگران البرز"
        >
          کاوشگران البرز
        </a>
        می‌باشد.
      </p>
      <h4 className={classes.mainTitle}>آدرس</h4>
      <p className={classes.mainTitle}>
        رامسر - خیابان مطهری - جنب بانک صادرات مرکزی - طبقه دوم - شرکت کاوشگران
        البرز
      </p>
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
