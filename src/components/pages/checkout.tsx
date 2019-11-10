import React from "react";
import { RouteComponentProps } from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

import { IAppState } from "../../reducers/app";
import { IShopState } from "../../reducers/shop";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import { IOrder, IOrderDetail } from "../../actions/shop";
import { loadOrder, send2Bank } from "../../actions/shopActions";

const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    mainTitle: {
      fontFamily: "Yekan",
      textAlign: "center"
    },
    companyLink: {
      fontFamily: "Yekan",
      padding: "2px"
    },
    root: {
      padding: theme.spacing(3, 2),
      // margin: theme.spacing(3, 2),
      overflowX: "auto"
    },
    addressGrid: {
      padding: theme.spacing(3, 2)
    },
    myFont: {
      fontFamily: "Yekan"
    },
    btn: {
      fontFamily: "Yekan",
      textAlign: "left",
      margin: theme.spacing(1, 2)
    },
    table: {
      maxWidth: "100%"
    },
    tableCell: {
      fontFamily: "Yekan"
    },
    button: {
      marginTop: theme.spacing(1),
      fontFamily: "Yekan"
    },
    progressDiv: {
      textAlign: "center",
      marginTop: "3rem"
    }
  })
);

interface IMatchParams {
  id?: string;
}

interface ICheckoutProps extends RouteComponentProps<IMatchParams> {
  order?: IOrder;
  orderDetails: IOrderDetail[];
  loadingOrder: boolean;
  payurl?: string;
  changePage: Function;
  loadOrder: Function;
  send2Bank: Function;
}

const Checkout: React.FC<ICheckoutProps> = (prop: ICheckoutProps) => {
  const classes = useStyles();

  const orderId: string | undefined = prop.match.params.id;

  React.useEffect(() => {
    if (prop.payurl !== undefined) {
      window.location.href = prop.payurl;
    }

    if (
      prop.order === undefined &&
      orderId !== undefined &&
      orderId !== "undefined"
    ) {
      prop.loadOrder(orderId);
    }
  });

  const totalPrice: number =
    prop.orderDetails === undefined
      ? 0
      : prop.orderDetails.reduce(
          (sum, od) => sum + (od.count === undefined ? 0 : od.count) * od.price,
          0
        );

  console.log("orderDetails", prop.orderDetails);

  return (
    <Container className={classes.root} maxWidth="md">
      <h3 className={classes.mainTitle}>لیست سفارش ها</h3>

      {prop.loadingOrder ? (
        <div className={classes.progressDiv}>
          <CircularProgress className={classes.progress} />
        </div>
      ) : prop.orderDetails !== undefined && prop.orderDetails.length === 0 ? (
        <Paper className={classes.root}>
          <Typography className={classes.myFont} variant="h5" component="h3">
            سبد خرید خالی هست!
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
        <Paper>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableCell} align="center">
                  نام محصول
                </TableCell>
                <TableCell className={classes.tableCell} align="center">
                  قیمت هر واحد
                </TableCell>
                <TableCell className={classes.tableCell} align="center">
                  تعداد سفارش
                </TableCell>
                <TableCell className={classes.tableCell} align="center">
                  قیمت
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prop.orderDetails &&
                prop.orderDetails.map((od: IOrderDetail) => (
                  <TableRow key={od.id}>
                    <TableCell
                      className={classes.tableCell}
                      component="td"
                      scope="row"
                      align="center"
                    >
                      {od.persianTitle}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      component="td"
                      scope="row"
                      align="center"
                    >
                      {Math.trunc(od.price)} تومان
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      component="td"
                      scope="row"
                      align="center"
                    >
                      {od.count}
                    </TableCell>
                    <TableCell
                      className={classes.tableCell}
                      component="td"
                      scope="row"
                      align="center"
                    >
                      {Math.trunc(od.price * od.count)} تومان
                    </TableCell>
                  </TableRow>
                ))}
              <TableRow>
                <TableCell className={classes.tableCell} colSpan={3}>
                  مجموع قیمت ها
                </TableCell>
                <TableCell className={classes.tableCell} align="center">
                  {totalPrice} تومان
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      )}

      {prop.order !== undefined && (
        <Grid className={classes.addressGrid} container spacing={1}>
          <Grid className={classes.myFont} item md={4} xs={12}>
            شماره سفارش: {prop.order.id}
          </Grid>
          <Grid className={classes.myFont} item md={4} xs={12}>
            نام خریدار: {prop.order.name}
          </Grid>
          <Grid className={classes.myFont} item md={4} xs={12}>
            شماره خریدار: {prop.order.mobile}
          </Grid>
          {prop.order.address !== "" && (
            <Grid className={classes.myFont} item xs={12}>
              آدرس: {prop.order.address}
            </Grid>
          )}
        </Grid>
      )}

      {orderId !== undefined && totalPrice > 0 && (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => prop.send2Bank(orderId)}
        >
          پرداخت مبلغ
          <CreditCardIcon className={classes.extendedIcon} />
        </Button>
      )}
    </Container>
  );
};

const mapStateToProps = (State: { app: IAppState; shop: IShopState }) => ({
  order: State.shop.order,
  orderDetails: State.shop.orderDetails,
  loadingOrder: State.shop.loadOrder,
  payurl: State.shop.payurl
});

const mapDispatchToProps = {
  // changePage: changePage
  changePage: (url: string) => push(url),
  loadOrder,
  send2Bank
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
