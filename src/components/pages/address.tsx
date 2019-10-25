import React from "react";
import { RouteComponentProps } from "react-router-dom";

import { connect } from "react-redux";
import { IAppState, AppPages } from "../../reducers/app";
import { IShopState, IDeliverState } from "../../reducers/shop";
import {
  ChangeDeliverKind,
  ChangeDeliverDistrict,
  ChangeMobile,
  ChangeFullname,
  ChangeAddress,
  ChangeDate,
  LoadUserInfo,
  LoadLocation,
  loadData
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

import { push } from "connected-react-router";

import Select from "@material-ui/core/Select";

import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";

// import LuxonUtils from "@date-io/luxon";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { IDbInfo, IDbMarket, IDbOpenTime } from "../../actions/shop";

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
    picker: {
      direction: "ltr",
      width: "100%",
      textAlign: "right"
      // fontFamily: "Yekan"
    },
    button: {
      fontFamily: "Yekan"
    }
  })
);

interface IMatchParams {
  id?: string;
}

interface IAddressProp extends RouteComponentProps<IMatchParams> {
  deliver: IDeliverState;
  //--
  dbInfo?: IDbInfo;
  markets?: IDbMarket[];
  openTimes?: IDbOpenTime[];

  ChangeDeliverKind: Function;
  ChangeDeliverDistrict: Function;
  ChangeMobile: Function;
  ChangeFullname: Function;
  ChangeAddress: Function;
  ChangeDate: Function;
  LoadUserInfo: Function;
  LoadLocation: Function;
  changePage: Function;
  loadData: Function;
}

const Address: React.FC<IAddressProp> = (prop: IAddressProp) => {
  const classes: any = useStyles();
  const groupId: string | undefined = prop.match.params.id;

  React.useEffect(() => {
    if (prop.dbInfo === undefined) {
      prop.loadData();
    }
  }, [prop]);

  const dbMarkets: IDbMarket[] | undefined =
    prop.markets &&
    prop.markets.filter(
      (m: IDbMarket) => Number(m.groups_id) === Number(groupId)
    );

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
              <MenuItem value={"expressSend"}>ارسال فوری</MenuItem>
              <MenuItem value={"futureSend"} disabled>
                ارسال در آینده
              </MenuItem>
              <MenuItem value={"takeout"}>دریافت حضوری</MenuItem>
              <MenuItem value={"reserve"}>رزرو مکان</MenuItem>
              <MenuItem value={"futureTakeout"}>تحویل حضوری در آینده</MenuItem>
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

        {(prop.deliver.deliverKind === "futureSend" ||
          prop.deliver.deliverKind === "reserve" ||
          prop.deliver.deliverKind === "futureTakeout") && (
          <Grid item xs={12} sm={6} className={classes.pickerGrid}>
            <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
              <DateTimePicker
                className={classes.picker}
                label="زمان تحویل یا دریافت"
                minDate={new Date()}
                okLabel="تأیید"
                cancelLabel="لغو"
                labelFunc={date =>
                  date ? date.format("jYYYY/jMM/jDD hh:mm A") : ""
                }
                value={prop.deliver.date}
                //onChange={handleDateChange}
                onChange={date => {
                  if (date != null) {
                    prop.ChangeDate(date);
                  }
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        )}

        {(prop.deliver.deliverKind === "expressSend" ||
          prop.deliver.deliverKind === "futureSend") && (
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
          (prop.deliver.deliverKind === "expressSend" ||
            prop.deliver.deliverKind === "takeout" ||
            prop.deliver.date != null) &&
          ((prop.deliver.deliverKind !== "expressSend" &&
            prop.deliver.deliverKind !== "futureSend") ||
            (prop.deliver.address.length > 3 &&
              (prop.deliver.deliverDistrict !== "" ||
                prop.deliver.location != null))) && (
            <Grid item xs={12} sm={8}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() =>
                  prop.changePage(
                    process.env.PUBLIC_URL + "/" + AppPages.CHECKOUT
                  )
                }
              >
                تائید خرید
                <ShoppingBasket className={classes.extendedIcon} />
              </Button>
            </Grid>
          )}
      </Grid>
    </Container>
  );
};

const mapStateToProps: any = (State: { app: IAppState; shop: IShopState }) => ({
  // cart: State.shop.cart,
  deliver: State.shop.deliver,
  //--
  dbInfo: State.shop.dbInfo,
  markets: State.shop.dbInfo && State.shop.dbInfo.markets,
  openTimes: State.shop.dbInfo && State.shop.dbInfo.openTimes
});

const mapDispatchToProps: any = {
  ChangeDeliverKind,
  ChangeDeliverDistrict,
  ChangeMobile,
  ChangeFullname,
  ChangeAddress,
  ChangeDate,
  LoadUserInfo,
  LoadLocation,
  // changePage: changePage
  // addToCart: addToCart,
  // removeFromCart: removeFromCart,
  loadData,
  changePage: (url: string) => push(url)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Address);
