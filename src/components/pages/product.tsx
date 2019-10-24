import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";

import { IAppState, AppPages } from "../../reducers/app";
import { IShopState, ICartState } from "../../reducers/shop";

import { IDbInfo, IDbProduct, IDbProductPlus } from "../../actions/shop";
import { addToCart, removeFromCart, loadData } from "../../actions/shopActions";

import Button from "@material-ui/core/Button";

import { push } from "connected-react-router";

const useStyles: any = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto"
    },
    table: {
      maxWidth: "100%"
    },
    tableCell: {
      fontFamily: "Yekan"
    },
    imgCell: {
      padding: "0"
    },
    cellImg: {
      width: "72px"
    },
    margin: {
      margin: theme.spacing(1)
    },
    button: {
      marginTop: theme.spacing(1),
      fontFamily: "Yekan",
      float: "left"
    }
  })
);

interface IMatchParams {
  id?: string;
  name?: string;
}

interface IProductProps extends RouteComponentProps<IMatchParams> {
  cart: ICartState;
  addToCart: Function;
  removeFromCart: Function;

  changePage: Function;

  dbInfo?: IDbInfo;
  products?: IDbProduct[];
  loadData: Function;
}

const Product: React.FC<IProductProps> = (prop: IProductProps) => {
  const classes: any = useStyles();

  const marketId: string | undefined = prop.match.params.id;

  React.useEffect(() => {
    // prop.changeTabId(0);
    if (prop.dbInfo === undefined) {
      prop.loadData();
    }
  }, [prop]);

  // const market: IMarket | undefined =
  //   marketId === undefined
  //     ? undefined
  //     : Markets.find(m => m.id === Number(marketId));
  // const products: IProduct[] =
  //   market === undefined
  //     ? []
  //     : market.products.map(pCart => {
  //         pCart.count =
  //           prop.cart === undefined || prop.cart[pCart.id] === undefined
  //             ? 0
  //             : prop.cart[pCart.id];
  //         return pCart;
  //       });

  // console.log(marketId, market, products);
  const products: IDbProduct[] | undefined =
    prop.products &&
    prop.products.filter(
      (p: IDbProduct) => Number(p.markets_id) === Number(marketId)
    );

  const productsPlus: IDbProductPlus[] | undefined =
    products &&
    products.map((p: IDbProduct) => {
      const pplus: IDbProductPlus = p as IDbProductPlus;
      const count: number =
        prop.cart === undefined || prop.cart[p.id] === undefined
          ? 0
          : prop.cart[p.id];
      return { ...pplus, count: count };
    });

  const totalPrice: number =
    productsPlus === undefined
      ? 0
      : productsPlus.reduce(
          (sum, p) => sum + (p.count === undefined ? 0 : p.count) * p.price,
          0
        );

  // -- TODO: if products=0 => به زودی

  return (
    <Container maxWidth="md">
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell} align="center">
                تصویر محصول
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                نام و قیمت هر واحد
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
            {productsPlus &&
              productsPlus.map((product: IDbProductPlus) => (
                <TableRow key={product.id}>
                  <TableCell className={classes.imgCell} align="center">
                    <img
                      className={classes.cellImg}
                      src={process.env.PUBLIC_URL + product.img}
                      alt={product.title}
                    />
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    component="td"
                    scope="row"
                    align="center"
                  >
                    {product.persianTitle}
                    <br />
                    {Math.trunc(product.price)} تومان
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    component="td"
                    scope="row"
                    align="center"
                  >
                    {product.max !== undefined &&
                    product.count !== undefined &&
                    product.count >= product.max ? (
                      <Fab
                        size="small"
                        // color="secondary"
                        aria-label="add"
                        className={classes.margin}
                        // onClick={event => prop.addToCart(event, product.id)}
                      >
                        <AddIcon />
                      </Fab>
                    ) : (
                      <Fab
                        size="small"
                        color="secondary"
                        aria-label="add"
                        className={classes.margin}
                        onClick={event =>
                          prop.addToCart(event, product.id, marketId)
                        }
                      >
                        <AddIcon />
                      </Fab>
                    )}

                    {product.count}

                    {product.count !== undefined && product.count > 0 ? (
                      <Fab
                        size="small"
                        color="secondary"
                        aria-label="add"
                        className={classes.margin}
                        onClick={event =>
                          prop.removeFromCart(event, product.id, marketId)
                        }
                      >
                        <RemoveIcon />
                      </Fab>
                    ) : (
                      <Fab
                        size="small"
                        // color="secondary"
                        aria-label="add"
                        className={classes.margin}
                        // onClick={event => prop.removeFromCart(event, product.id)}
                      >
                        <RemoveIcon />
                      </Fab>
                    )}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    component="td"
                    scope="row"
                    align="center"
                  >
                    {(product.count === undefined ? 0 : product.count) *
                      product.price}{" "}
                    تومان
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
      {totalPrice > 0 && (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() =>
            prop.changePage(process.env.PUBLIC_URL + "/" + AppPages.ADDRESS)
          }
        >
          تکمیل خرید
          <ShoppingBasket className={classes.extendedIcon} />
        </Button>
      )}
      {/* <ButtonGroup
        className={classes.btnGroup}
        fullWidth
        aria-label="full width contained button group"
      >
        <Button
          color="secondary"
          className={classes.btnGroup}
          // href={process.env.PUBLIC_URL + "/checkout"}
          onClick={() =>
            prop.changePage(process.env.PUBLIC_URL + "/" + AppPages.CHECKOUT)
          }
        >
          <ShoppingBasket className={classes.extendedIcon} />
          <h4 className={classes.btnText}>سبد خرید</h4>
        </Button>
        <Button
          color="primary"
          className={classes.btnGroup}
          // href={process.env.PUBLIC_URL + "/"}
          onClick={() => prop.changePage(process.env.PUBLIC_URL + "/")}
        >
          <ViewModule className={classes.extendedIcon} />
          <h4 className={classes.btnText}>ادامه خرید</h4>
        </Button>
      </ButtonGroup> */}
    </Container>
  );
};

const mapStateToProps: any = (State: { app: IAppState; shop: IShopState }) => ({
  cart: State.shop.cart,
  dbInfo: State.shop.dbInfo,
  products: State.shop.dbInfo && State.shop.dbInfo.products
});

const mapDispatchToProps: any = {
  // changePage: changePage
  addToCart,
  removeFromCart,
  loadData,
  changePage: (url: string) => push(url)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
