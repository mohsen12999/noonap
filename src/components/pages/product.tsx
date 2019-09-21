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
import ViewModule from "@material-ui/icons/ViewModule";

import { IAppState, AppPages } from "../../reducers/app";
import { IShopState, ICartState } from "../../reducers/shop";

import { PRODUCT_LIST, IProduct } from "../../actions/shop";
import { addToCart, removeFromCart } from "../../actions/shopActions";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

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
    btnGroup: {
      marginTop: theme.spacing(3),
      direction: "ltr"
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    },
    btnText: {
      fontFamily: "Yekan",
      margin: "5px"
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
}

const Product: React.FC<IProductProps> = (prop: IProductProps) => {
  const classes: any = useStyles();

  const productId: string | undefined = prop.match.params.id;

  const products: IProduct[] =
    productId === undefined
      ? []
      : PRODUCT_LIST.filter(p => p.productGroupId === Number(productId)).map(
          pCart => {
            pCart.count =
              prop.cart === undefined || prop.cart[pCart.id] === undefined
                ? 0
                : prop.cart[pCart.id];
            return pCart;
          }
        );
  const totalPrice: number = products.reduce(
    (sum, p) => sum + p.count * p.price,
    0
  );

  // console.log("products", products);
  // if products=0 => به زودی

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
            {products.map(product => (
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
                  {product.title}
                  <br />
                  {product.price} تومان
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  component="td"
                  scope="row"
                  align="center"
                >
                  <Fab
                    size="small"
                    color="secondary"
                    aria-label="add"
                    className={classes.margin}
                    onClick={event => prop.addToCart(event, product.id)}
                  >
                    <AddIcon />
                  </Fab>
                  {product.count}
                  <Fab
                    size="small"
                    color="secondary"
                    aria-label="add"
                    className={classes.margin}
                    onClick={event => prop.removeFromCart(event, product.id)}
                  >
                    <RemoveIcon />
                  </Fab>
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  component="td"
                  scope="row"
                  align="center"
                >
                  {product.count * product.price} تومان
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
      <ButtonGroup
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
      </ButtonGroup>
    </Container>
  );
};

const mapStateToProps = (State: { app: IAppState; shop: IShopState }) => ({
  cart: State.shop.cart
});

const mapDispatchToProps = {
  // changePage: changePage
  addToCart: addToCart,
  removeFromCart: removeFromCart,
  changePage: (url: string) => push(url)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
