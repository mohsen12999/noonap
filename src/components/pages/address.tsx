import React from "react";
import { RouteComponentProps } from "react-router-dom";

import { connect } from "react-redux";
import { IAppState } from "../../reducers/app";
import {
  IShopState,
  IDeliverState,
  ICartState,
  deliverKindType,
  deliverKindPersian
} from "../../reducers/shop";
import {
  ChangeDeliverKind,
  ChangeDeliverDistrict,
  ChangeMobile,
  ChangeFullname,
  ChangeAddress,
  ChangeDate,
  ChangeTime,
  LoadUserInfo,
  LoadLocation,
  loadData,
  MakeOrder
} from "../../actions/shopActions";

import Container from "@material-ui/core/Container";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";

import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

import RecentActorsIcon from "@material-ui/icons/RecentActors";
import CircularProgress from "@material-ui/core/CircularProgress";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";

import Button from "@material-ui/core/Button";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";

import Select from "@material-ui/core/Select";

import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";

//import { push } from "connected-react-router";
// import LuxonUtils from "@date-io/luxon";
import {
  DatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { IMarketPlus } from "../../actions/shop";

declare global {
  interface Date {
    format(arg: any): string;
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      // marginLeft: theme.spacing(1),
      // marginRight: theme.spacing(1),
      fontFamily: "Yekan"
      // width: 200
    },
    dense: {
      marginTop: 19
    },
    menu: {
      width: 200
    },
    margin: {
      // margin: theme.spacing(1),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "100%"
    },
    textField2: {
      /*flexBasis: 200*/
    },
    grid: {
      paddingTop: theme.spacing(2)
    },
    selectFormControl: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "100%"
    },
    pickerGrid: {
      // direction: "ltr",
      // width: "100%"
      // fontFamily: "Yekan"
    },
    datepicker: {
      direction: "ltr",
      width: "100%",
      textAlign: "right"
      // fontFamily: "Yekan"
    },
    timepicker: {
      direction: "ltr",
      width: "100%",
      textAlign: "right"
      // fontFamily: "Yekan"
    },
    button: {
      fontFamily: "Yekan"
    },
    closeSpan: {
      color: "green"
    }
  })
);

interface IMatchParams {
  id?: string;
}

interface IAddressProp extends RouteComponentProps<IMatchParams> {
  deliver: IDeliverState;
  // dbInfo?: IDbInfo;
  loadDbInfo: boolean;
  loadingOrder: boolean;
  markets: IMarketPlus[];
  cart: ICartState;

  ChangeDeliverKind: Function;
  ChangeDeliverDistrict: Function;
  ChangeMobile: Function;
  ChangeFullname: Function;
  ChangeAddress: Function;
  ChangeDate: Function;
  ChangeTime: Function;
  LoadUserInfo: Function;
  LoadLocation: Function;
  loadData: Function;
  MakeOrder: Function;
}

const Address: React.FC<IAddressProp> = (prop: IAddressProp) => {
  const classes: any = useStyles();
  const marketId: string | undefined = prop.match.params.id;

  React.useEffect(() => {
    if (prop.loadDbInfo === false) {
      prop.loadData();
    }
  }, [prop]);

  const market: IMarketPlus | undefined = prop.markets.find(
    (m: IMarketPlus) => Number(m.id) === Number(marketId)
  );

  // console.log(market, prop.deliver);

  const handleClickLoadingInfo = () => {
    const mobile: string = prop.deliver.mobile;
    prop.LoadUserInfo(mobile);
  };

  const handleClickLoadingAddress = () => {
    prop.LoadLocation();
    // setValues({ ...values, loadingAddress: !values.loadingAddress });
  };

  jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: false });

  return (
    <Container maxWidth="md">
      <Grid
        className={classes.grid}
        container
        spacing={3}
        justify="space-around"
        alignItems="stretch"
      >
        <Grid item xs={12} sm={8}>
          <FormControl className={classes.selectFormControl}>
            <InputLabel htmlFor="deliverKind-helper">شیوه دریافت</InputLabel>
            <Select
              value={prop.deliver.deliverKind}
              // onChange={handleChange2}
              onChange={event =>
                prop.ChangeDeliverKind(event, event.target.value)
              }
              inputProps={{
                name: "deliverKind",
                id: "deliverKind-helper"
              }}
            >
              <MenuItem value="">
                <em>هیچکدام</em>
              </MenuItem>

              {market !== undefined &&
                market.express_send &&
                (market.isOpen ? (
                  <MenuItem value={deliverKindType.express_send}>
                    {deliverKindPersian(deliverKindType.express_send)}
                  </MenuItem>
                ) : (
                  <MenuItem value={deliverKindType.express_send} disabled>
                    {deliverKindPersian(deliverKindType.express_send)}{" "}
                    <span className={classes.closeSpan}>(بسته است)</span>
                  </MenuItem>
                ))}

              {market !== undefined && market.future_send && (
                <MenuItem value={deliverKindType.future_send}>
                  {deliverKindPersian(deliverKindType.future_send)}
                </MenuItem>
              )}

              {market !== undefined &&
                market.takeout &&
                (market.isOpen ? (
                  <MenuItem value={deliverKindType.takeout}>
                    {deliverKindPersian(deliverKindType.takeout)}
                  </MenuItem>
                ) : (
                  <MenuItem value={deliverKindType.takeout} disabled>
                    {deliverKindPersian(deliverKindType.takeout)}{" "}
                    <span className={classes.closeSpan}>(بسته است)</span>
                  </MenuItem>
                ))}

              {market !== undefined && market.reserve && (
                <MenuItem value={deliverKindType.reserve}>
                  {deliverKindPersian(deliverKindType.reserve)}
                </MenuItem>
              )}

              {market !== undefined && market.future_takeout && (
                <MenuItem value={deliverKindType.future_takeout}>
                  {deliverKindPersian(deliverKindType.future_takeout)}
                </MenuItem>
              )}
            </Select>
            <FormHelperText>شیوه دریافت را انتخاب کنید</FormHelperText>
          </FormControl>
        </Grid>

        {prop.deliver.deliverKind !== "" && (
          <React.Fragment>
            <Grid item xs={12} sm={8}>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="adornment-mobile">موبایل</InputLabel>
                <Input
                  id="adornment-mobile"
                  value={prop.deliver.mobile}
                  fullWidth
                  onChange={event =>
                    prop.ChangeMobile(event, event.target.value)
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle mobile visibility"
                        onClick={handleClickLoadingInfo}
                        // onClick={prop.LoadUserInfo(prop.deliver.mobile)}
                        onMouseDown={event => event.preventDefault()}
                      >
                        {prop.deliver.loadingInfo ? (
                          <CircularProgress />
                        ) : (
                          <RecentActorsIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText id="component-helper-text">
                  اگر قبلا مشتری بودید بعد از وارد کردن موبایل، روی دکمه کلیک
                  کنید
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={8}>
              <TextField
                id="standard-name"
                label="نام"
                fullWidth
                className={clsx(classes.margin, classes.textField)}
                value={prop.deliver.fullname}
                onChange={event =>
                  prop.ChangeFullname(event, event.target.value)
                }
                margin="normal"
              />
            </Grid>
          </React.Fragment>
        )}

        {(prop.deliver.deliverKind === deliverKindType.future_send ||
          prop.deliver.deliverKind === deliverKindType.reserve ||
          prop.deliver.deliverKind === deliverKindType.future_takeout) && (
          <React.Fragment>
            <Grid item xs={12} sm={5} className={classes.pickerGrid}>
              <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
                <DatePicker
                  className={classes.datepicker}
                  label="تاریخ تحویل یا دریافت"
                  minDate={new Date()}
                  okLabel="تأیید"
                  cancelLabel="لغو"
                  labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                  value={prop.deliver.date}
                  // onChange={handleDateChange}
                  onChange={date => {
                    // console.log(date);
                    if (date != null) {
                      prop.ChangeDate(date);
                    }
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12} sm={5} className={classes.pickerGrid}>
              <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
                <KeyboardTimePicker
                  className={classes.timepicker}
                  label="زمان تحویل یا دریافت"
                  // minDate={new Date()}
                  okLabel="تأیید"
                  cancelLabel="لغو"
                  format="HH:mm"
                  labelFunc={date => (date ? date.format("hh:mm A") : "")}
                  value={prop.deliver.date}
                  // onChange={handleDateChange}
                  onChange={date => {
                    // console.log(date);
                    if (date != null) {
                      prop.ChangeTime(date);
                    }
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </React.Fragment>
        )}

        {(prop.deliver.deliverKind === deliverKindType.express_send ||
          prop.deliver.deliverKind === deliverKindType.future_send) && (
          <React.Fragment>
            <Grid item xs={12} sm={8}>
              <FormControl className={classes.selectFormControl}>
                <InputLabel htmlFor="deliverDistrict-helper">
                  محدوده دریافت
                </InputLabel>
                <Select
                  value={prop.deliver.deliverDistrict}
                  // onChange={handleChange2}
                  onChange={event =>
                    prop.ChangeDeliverDistrict(event, event.target.value)
                  }
                  inputProps={{
                    name: "deliverDistrict",
                    id: "deliverDistrict-helper"
                  }}
                >
                  <MenuItem value="">
                    <em>هیچکدام</em>
                  </MenuItem>
                  <MenuItem value={"abrisham"}>
                    ابریشم محله و بیست متری
                  </MenuItem>
                  <MenuItem value={"katalom"}>کتالم و سادات شهر</MenuItem>
                  <MenuItem value={"rejaee"}>رضی محله و میدان رجایی</MenuItem>
                  <MenuItem value={"latmahale"}>تنگه دره و لات محله</MenuItem>
                </Select>
                <FormHelperText>محدوده دریافت را انتخاب کنید</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={8}>
              <FormControl className={clsx(classes.margin, classes.textField2)}>
                <InputLabel htmlFor="adornment-address">آدرس</InputLabel>
                <Input
                  id="adornment-address"
                  value={prop.deliver.address}
                  multiline
                  fullWidth
                  // onChange={handleChange("address")}
                  onChange={event =>
                    prop.ChangeAddress(event, event.target.value)
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle address visibility"
                        onClick={handleClickLoadingAddress}
                        onMouseDown={event => event.preventDefault()}
                      >
                        {prop.deliver.loadingLocation ? (
                          <CircularProgress />
                        ) : (
                          <NotListedLocationIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText id="component-helper-text">
                  برای تعیین موقعیت فعلی روی دکمه کلیک کنید
                </FormHelperText>
              </FormControl>
            </Grid>
          </React.Fragment>
        )}

        {prop.deliver.deliverKind !== "" &&
          prop.deliver.mobile.length > 9 &&
          prop.deliver.fullname.length > 3 &&
          (prop.deliver.deliverKind === deliverKindType.express_send ||
            prop.deliver.deliverKind === deliverKindType.takeout ||
            prop.deliver.date != null) &&
          ((prop.deliver.deliverKind !== deliverKindType.express_send &&
            prop.deliver.deliverKind !== deliverKindType.future_send) ||
            (prop.deliver.address.length > 3 &&
              (prop.deliver.deliverDistrict !== "" ||
                prop.deliver.location != null))) && (
            <Grid item xs={12} sm={8}>
              {prop.loadingOrder ? (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  disabled
                >
                  تائید خرید
                  <ShoppingBasket className={classes.extendedIcon} />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={
                    () => prop.MakeOrder(marketId, prop.cart, prop.deliver)
                    // prop.changePage(
                    //   process.env.PUBLIC_URL + "/" + AppPages.CHECKOUT
                    // )
                  }
                >
                  تائید خرید
                  <ShoppingBasket className={classes.extendedIcon} />
                </Button>
              )}
            </Grid>
          )}
      </Grid>
    </Container>
  );
};

const mapStateToProps: any = (State: { app: IAppState; shop: IShopState }) => ({
  // cart: State.shop.cart,
  deliver: State.shop.deliver,
  markets: State.shop.markets,
  loadDbInfo: State.shop.loadDbInfo,
  cart: State.shop.cart,
  loadingOrder: State.shop.loadOrder
});

const mapDispatchToProps: any = {
  ChangeDeliverKind,
  ChangeDeliverDistrict,
  ChangeMobile,
  ChangeFullname,
  ChangeAddress,
  ChangeDate,
  ChangeTime,
  LoadUserInfo,
  LoadLocation,
  // changePage: changePage
  // addToCart: addToCart,
  // removeFromCart: removeFromCart,
  loadData,
  MakeOrder // (url: string) => push(url)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Address);
