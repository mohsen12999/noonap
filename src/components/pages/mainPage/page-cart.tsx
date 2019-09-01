import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: "30%",
    backgroundSize: "contain"
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  },
  persianfont: {
    fontFamily: "Yekan"
  }
}));

interface IPageCartProp {
  title: string;
  subtitle: string;
  img: string;
}

const PageCart: React.FC<IPageCartProp> = ({ title, subtitle, img }) => {
  // const PageCart: React.FC = (title: string, subtitle: string, img: string) => {
  const classes = useStyles();
  const theme = useTheme();
  console.log(title, subtitle, img);

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cover}
        image={process.env.PUBLIC_URL + img} //"/images/group/shopping-cart.png"
        title="Live from space album cover"
      />

      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography
            className={classes.persianfont}
            component="h5"
            variant="h5"
          >
            {title}
          </Typography>
          <Typography
            className={classes.persianfont}
            variant="subtitle1"
            color="textSecondary"
          >
            {subtitle}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default PageCart;

/*
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    maxWidth: "100%"
  },
  media: {
    height: 140
  }
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          // image="/images/group/shopping-cart.png"
          image={process.env.PUBLIC_URL + "/images/group/shopping-cart.png"}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
*/
