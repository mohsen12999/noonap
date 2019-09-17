import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import { IAppState } from "../../reducers/app";
import { IShopState } from "../../reducers/shop";
import { connect } from "react-redux";

const useStyles: any = makeStyles({
  mainTitle: {
    fontFamily: "Yekan"
  },
  companyLink: {
    fontFamily: "Yekan",
    padding: "2px"
  }
});

interface IAboutProps {
  // tabId?: number;
  // changeTabId: Function;
}

const About: React.FC<IAboutProps> = (prop: IAboutProps) => {
  const classes: any = useStyles();

  // useEffect(() => {
  //   prop.changeTabId(1);
  // });

  // console.log(prop.tabId);

  return (
    <Container maxWidth="sm">
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
      <h3 className={classes.mainTitle}>آدرس</h3>
      <p className={classes.mainTitle}>
        رامسر - خیابان مطهری - جنب بانک صادرات مرکزی - طبقه دوم - شرکت کاوشگران
        البرز
      </p>
    </Container>
  );
};

const mapStateToProps = (State: { app: IAppState; shop: IShopState }) => ({
  // cart: State.shop.cart
  // tabId: State.app.tabId
});

const mapDispatchToProps = {
  // changePage: changePage
  // changeTabId: changeTabId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
