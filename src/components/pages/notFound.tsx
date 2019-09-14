import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
      margin: theme.spacing(3, 2)
    },
    myFont: {
      fontFamily: "Yekan"
    }
  })
);

const NotFound: React.FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <Paper className={classes.root}>
        <Typography className={classes.myFont} variant="h5" component="h3">
          صفحه مورد نظر پیدا نشد.
        </Typography>
        <Typography className={classes.myFont} component="p">
          لطفاً دوباره تلاش کنید.
        </Typography>
      </Paper>
    </Container>
  );
};

export default NotFound;
