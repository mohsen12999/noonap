import React, { useEffect } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { RouteComponentProps } from "react-router-dom";
import queryString from "query-string";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import { IShopState, deliverKindPersianst } from "../../reducers/shop";
import { IAppState, AppPages } from "../../reducers/app";
import { verifyBank } from "../../actions/shopActions";
import { IOrder, IOrderDetail } from "../../actions/shop";

import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    progressDiv: {
      textAlign: "center",
      marginTop: "3rem"
    },
    myFont: {
      fontFamily: "Yekan"
    },
    btn: {
      fontFamily: "Yekan",
      textAlign: "left",
      margin: theme.spacing(1, 2)
    },
    addressGrid: {
      padding: theme.spacing(3, 2)
    },
    mainTitle: {
      fontFamily: "Yekan",
      textAlign: "center"
    },
    paper: {
      padding: theme.spacing(3, 2),
      margin: theme.spacing(3, 2)
    }
  })
);

interface IComebackProps extends RouteComponentProps<any> {
  order?: IOrder;
  orderDetails: IOrderDetail[];
  loadingOrder: boolean;
  transId?: string;
  verifyBank: Function;
  changePage: Function;
}

const Comeback: React.FC<IComebackProps> = (prop: IComebackProps) => {
  const classes: any = useStyles();

  const search: string = prop.history.location.search;
  const parsed: queryString.ParsedQuery<string> = queryString.parse(search); //comeback?status=1&token=b5WYow

  const orderId: string | null = sessionStorage.getItem("orderId");
  console.log(search, prop.order, prop.orderDetails, orderId);

  useEffect(() => {
    if (prop.transId === undefined && !prop.loadingOrder) {
      prop.verifyBank(parsed.token);
    }
  }, [prop,parsed.token]);

  // console.log(prop.tabId);
  // is good? or bad

  return (
    <Container maxWidth="md">
      {prop.loadingOrder ? (
        <div className={classes.progressDiv}>
          <CircularProgress className={classes.progress} />
        </div>
      ) : prop.transId === undefined || prop.transId === "" ? (
        <Paper className={classes.paper}>
          <Typography className={classes.myFont} variant="h5" component="h3">
            اشکال در پرداخت مبلغ
          </Typography>
          <Typography className={classes.myFont} component="p">
            لطفا دوباره تلاش کنید
          </Typography>

          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={() => prop.changePage(process.env.PUBLIC_URL + "/")}
          >
            بازگشت به صفحه اصلی
          </Button>
          {orderId && orderId.length > 0 && (
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={() =>
                prop.changePage(
                  process.env.PUBLIC_URL +
                    "/" +
                    AppPages.CHECKOUT +
                    "/" +
                    orderId
                )
              }
            >
              بازگشت به صفحه سفارش
            </Button>
          )}
        </Paper>
      ) : (
        <React.Fragment>
          <h3 className={classes.mainTitle}>پرداخت موفق</h3>
          {prop.order !== undefined && (
            <Grid className={classes.addressGrid} container spacing={1}>
              <Grid className={classes.myFont} item md={4} xs={12}>
                شماره سفارش: {prop.order.id}
              </Grid>
              <Grid className={classes.myFont} item md={4} xs={12}>
                کد پیگیری: {prop.transId}
              </Grid>
              <Grid className={classes.myFont} item md={4} xs={12}>
                شماره خریدار: {prop.order.mobile}
              </Grid>
              <Grid className={classes.myFont} item md={4} xs={12}>
                نام خریدار: {prop.order.name}
              </Grid>
              <Grid className={classes.myFont} item md={4} xs={12}>
                شیوه خرید: {deliverKindPersianst(prop.order.deliverKind)}
              </Grid>

              {prop.order.address !== "" && (
                <Grid className={classes.myFont} item md={8} xs={12}>
                  آدرس: {prop.order.address}
                </Grid>
              )}
            </Grid>
          )}
          {prop.orderDetails !== undefined && prop.orderDetails.length !== 0 && (
            <Paper>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.myFont} align="center">
                      نام محصول
                    </TableCell>
                    <TableCell className={classes.myFont} align="center">
                      قیمت هر واحد
                    </TableCell>
                    <TableCell className={classes.myFont} align="center">
                      تعداد سفارش
                    </TableCell>
                    <TableCell className={classes.myFont} align="center">
                      قیمت
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {prop.orderDetails &&
                    prop.orderDetails.map((od: IOrderDetail) => (
                      <TableRow key={od.id}>
                        <TableCell
                          className={classes.myFont}
                          component="td"
                          scope="row"
                          align="center"
                        >
                          {od.persianTitle}
                        </TableCell>
                        <TableCell
                          className={classes.myFont}
                          component="td"
                          scope="row"
                          align="center"
                        >
                          {Math.trunc(od.price)} تومان
                        </TableCell>
                        <TableCell
                          className={classes.myFont}
                          component="td"
                          scope="row"
                          align="center"
                        >
                          {od.count}
                        </TableCell>
                        <TableCell
                          className={classes.myFont}
                          component="td"
                          scope="row"
                          align="center"
                        >
                          {Math.trunc(od.price * od.count)} تومان
                        </TableCell>
                      </TableRow>
                    ))}
                  <TableRow>
                    <TableCell className={classes.myFont} colSpan={3}>
                      مجموع قیمت ها
                    </TableCell>
                    <TableCell className={classes.myFont} align="center">
                      {prop.order !== undefined && prop.order.price} تومان
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          )}
        </React.Fragment>
      )}
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
  changePage: (url: string) => push(url),
  verifyBank
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comeback);
