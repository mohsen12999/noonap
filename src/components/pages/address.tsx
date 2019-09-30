import React from "react";
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
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Grid from "@material-ui/core/Grid";

import RecentActorsIcon from "@material-ui/icons/RecentActors";
import CircularProgress from "@material-ui/core/CircularProgress";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";

import Select from "@material-ui/core/Select";

// import { MuiPickersUtilsProvider } from "@material-ui/pickers";
// pick a date util library
// import MomentUtils from "@date-io/moment";
import DateFnsUtils from "@date-io/date-fns";
// import LuxonUtils from "@date-io/luxon";
import {
  DateTimePicker,
  KeyboardDateTimePicker,
  KeyboardDatePicker,
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

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
    }
  })
);

interface IAddressProp {
  name: string;
  mobile: string;
  address: string;

  age: string;
  date: Date;

  loadingInfo: boolean;
  loadingAddress: boolean;
}

const Address: React.FC = () => {
  const classes: any = useStyles();

  const [values, setValues] = React.useState<IAddressProp>({
    name: "",
    mobile: "",
    address: "",
    age: "",
    date: new Date(),

    loadingInfo: false,
    loadingAddress: false
  });

  const handleChange = (name: keyof IAddressProp) => (
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

  const handleDateChange = (date: Date | null) => {
    // setSelectedDate(date);
    if (date !== null) {
      setValues({ ...values, date: date });
    }
  };

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

        <Grid item xs={12} sm={6}>
          <TextField
            id="time"
            label="ساعت دریافت"
            type="time"
            defaultValue="07:30"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              step: 300 // 5 min
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          {/* <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          /> */}
          {/* <KeyboardDateTimePicker
            variant="inline"
            ampm={false}
            label="With keyboard"
            value={values.date}
            onChange={handleDateChange}
            onError={console.log}
            disablePast
            format="yyyy/MM/dd HH:mm"
          /> */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker value={values.date} onChange={handleDateChange} />
            <TimePicker value={values.date} onChange={handleDateChange} />
            <DateTimePicker value={values.date} onChange={handleDateChange} />
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

      <p>address page</p>
    </Container>
  );
};

export default Address;
