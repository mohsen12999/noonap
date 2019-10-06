import React from "react";

import { connect } from "react-redux";
import { IAppState } from "../../reducers/app";
import { IShopState, IDeliverState } from "../../reducers/shop";

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

import moment from "moment";
import jMoment, { Moment } from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";

// import LuxonUtils from "@date-io/luxon";
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
  MaterialUiPickersDate
} from "@material-ui/pickers";

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

interface IAddressState {
  name: string;
  mobile: string;
  address: string;

  age: string;
  date: Moment;

  loadingInfo: boolean;
  loadingAddress: boolean;
}

interface IAddressProp {
  deliver: IDeliverState;
  loadingInfo: false;
  loadingAddress: false;
}

const Address: React.FC<IAddressProp> = (prop: IAddressProp) => {
  const classes: any = useStyles();

  const [values, setValues] = React.useState<IAddressState>({
    name: "",
    mobile: "",
    address: "",
    age: "",
    // date: new Date(),
    date: moment(),

    loadingInfo: false,
    loadingAddress: false
  });

  const handleChange = (name: keyof IAddressState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, loadingInfo: !values.loadingInfo });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // const inputLabel = React.useRef<HTMLLabelElement>(null);
  // const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current!.offsetWidth);
  // }, []);

  const handleChange2 = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name as string]: event.target.value
    }));
  };

  const handleDateChange = (date: MaterialUiPickersDate) => {
    // setSelectedDate(date);
    if (date !== null) {
      setValues({ ...values, date: date });
      //setValues({ ...values, date: date.toDate() });
    }
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
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.selectFormControl}>
            <InputLabel htmlFor="age-helper">شیوه دریافت</InputLabel>
            <Select
              value={values.age}
              onChange={handleChange2}
              inputProps={{
                name: "age",
                id: "age-helper"
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>ارسال فوری</MenuItem>
              <MenuItem value={20}>ارسال در آینده</MenuItem>
              <MenuItem value={30}>دریافت حضوری</MenuItem>
              <MenuItem value={40}>رزرو مکان</MenuItem>
            </Select>
            <FormHelperText>شیوه دریافت را انتخاب کنید</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl className={classes.selectFormControl}>
            <InputLabel htmlFor="age-helper">محدوده دریافت</InputLabel>
            <Select
              value={values.age}
              onChange={handleChange2}
              inputProps={{
                name: "age",
                id: "age-helper"
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>ابریشم محله و بیست متری</MenuItem>
              <MenuItem value={20}>کتالم و سادات شهر</MenuItem>
              <MenuItem value={30}>رضی محله و میدان رجایی</MenuItem>
              <MenuItem value={40}>تنگه دره و لات محله</MenuItem>
            </Select>
            <FormHelperText>محدوده دریافت را انتخاب کنید</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} className={classes.pickerGrid}>
          <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
            <DateTimePicker
              className={classes.picker}
              label="زمان تحویل"
              minDate={new Date()}
              okLabel="تأیید"
              cancelLabel="لغو"
              labelFunc={date =>
                date ? date.format("jYYYY/jMM/jDD hh:mm A") : ""
              }
              value={values.date}
              onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel htmlFor="adornment-mobile">موبایل</InputLabel>
            <Input
              id="adornment-mobile"
              value={values.mobile}
              fullWidth
              onChange={handleChange("mobile")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle mobile visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.loadingInfo ? (
                      <CircularProgress />
                    ) : (
                      <RecentActorsIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id="component-helper-text">
              اگر قبلا مشتری بودید روی دکمه کلیک کنید
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="standard-name"
            label="نام"
            fullWidth
            className={clsx(classes.margin, classes.textField)}
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl className={clsx(classes.margin, classes.textField2)}>
            <InputLabel htmlFor="adornment-address">آدرس</InputLabel>
            <Input
              id="adornment-address"
              value={values.address}
              multiline
              fullWidth
              onChange={handleChange("address")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle address visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.loadingAddress ? (
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
      </Grid>

      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        // onClick={() =>
        //   prop.changePage(process.env.PUBLIC_URL + "/" + AppPages.ADDRESS)
        // }
      >
        تائید خرید
        <ShoppingBasket className={classes.extendedIcon} />
      </Button>
    </Container>
  );
};

const mapStateToProps: any = (State: { app: IAppState; shop: IShopState }) => ({
  // cart: State.shop.cart,
  deliver: State.shop.deliver
});

const mapDispatchToProps: any = {
  // changePage: changePage
  // addToCart: addToCart,
  // removeFromCart: removeFromCart,
  // changePage: (url: string) => push(url)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Address);
