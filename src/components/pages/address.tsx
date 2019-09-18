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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
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
      margin: theme.spacing(1),
      width: "100%"
    },
    textField2: {
      /*flexBasis: 200*/
    },
    grid: {
      paddingTop: theme.spacing(2)
    }
  })
);

interface IAddressProp {
  name: string;
  mobile: string;
  address: string;

  loadingInfo: boolean;
  loadingAddress: boolean;
}

const Address: React.FC = () => {
  const classes: any = useStyles();

  const [values, setValues] = React.useState<IAddressProp>({
    name: "",
    mobile: "",
    address: "",

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
          <FormControl className={clsx(classes.margin, classes.textField2)}>
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
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="standard-name"
            label="نام"
            fullWidth
            className={classes.textField}
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
          </FormControl>
        </Grid>
      </Grid>

      <p>address page</p>
    </Container>
  );
};

export default Address;
