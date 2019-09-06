/*
import React from "react";
import { RouteComponentProps } from "react-router-dom";
// interface IProductProp{
//     id:number,
//     name:string
// }

interface IMatchParams {
  id?: string;
  name?: string;
}

interface IProductProps extends RouteComponentProps<IMatchParams> {}

const Product: React.FC<IProductProps> = (prop: IProductProps) => {
  console.log(prop.match.params.id);
  return (
    <div>
      <h3>Product page</h3>
    </div>
  );
};

export default Product;
*/

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

import { IAppState } from "../../reducers/app";
import { IShopState, ICartState } from "../../reducers/shop";

import { PRODUCT_LIST, IProductSpecific } from "../../actions/shop";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto"
    },
    table: {
      minWidth: 650
    },
    tableCell: {
      fontFamily: "Yekan"
    }
  })
);

//-- temp
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];
//- /temp

interface IMatchParams {
  id?: string;
  name?: string;
}

interface IProductProps extends RouteComponentProps<IMatchParams> {
  cart: ICartState;
}

const Product: React.FC<IProductProps> = (prop: IProductProps) => {
  const classes = useStyles();

  const productId: string | undefined = prop.match.params.id;
  const preProducts: IProductSpecific[] =
    productId === undefined
      ? []
      : PRODUCT_LIST.filter(p => p.productGroupId === Number(productId));
  const products: IProductSpecific[] = preProducts.map(pCart => {
    pCart.count =
      prop.cart === undefined || prop.cart[pCart.id] === undefined
        ? 0
        : prop.cart[pCart.id];
    return pCart;
  });

  console.log("products", preProducts, products);

  // if products=0 => به زودی

  return (
    <Container maxWidth="md">
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell} align="right">
                تصویر محصول
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                نام و قیمت
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                تعداد
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                قیمت
              </TableCell>
              <TableCell className={classes.tableCell} align="right">
                Protein&nbsp;(g)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell
                  className={classes.tableCell}
                  component="th"
                  scope="row"
                >
                  {row.name}
                </TableCell>
                <TableCell className={classes.tableCell} align="right">
                  {row.calories}
                </TableCell>
                <TableCell className={classes.tableCell} align="right">
                  {row.fat}
                </TableCell>
                <TableCell className={classes.tableCell} align="right">
                  {row.carbs}
                </TableCell>
                <TableCell className={classes.tableCell} align="right">
                  {row.protein}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
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
)(Product);
