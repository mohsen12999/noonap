import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import { IAppState } from "../../reducers/app";
import { IShopState } from "../../reducers/shop";
import { connect } from "react-redux";

import { RouteComponentProps } from "react-router-dom";
import queryString from "query-string";

import { verifyBank } from "../../actions/shopActions";
import { IOrder, IOrderDetail } from "../../actions/shop";

const useStyles: any = makeStyles({
  mainTitle: {
    fontFamily: "Yekan"
  },
  companyLink: {
    fontFamily: "Yekan",
    padding: "2px"
  }
});

interface IComebackProps extends RouteComponentProps<any> {
  order?: IOrder;
  orderDetails: IOrderDetail[];
  loadingOrder: boolean;
  transId: string;
  verifyBank: Function;
}

const Comeback: React.FC<IComebackProps> = (prop: IComebackProps) => {
  const classes: any = useStyles();

  const search: string = prop.history.location.search;
  const parsed: queryString.ParsedQuery<string> = queryString.parse(
    location.search
  );

  console.log(search);

  useEffect(() => {
    // http://Your-CallBack-URL?status={transaction_status}&token={token}
    prop.verifyBank(parsed.token);
  });

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
  order: State.shop.order,
  orderDetails: State.shop.orderDetails,
  transId: State.shop.transId,
  loadingOrder: State.shop.loadOrder
});

const mapDispatchToProps = {
  verifyBank
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comeback);
