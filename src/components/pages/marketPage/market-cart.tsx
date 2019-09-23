import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import Chip from "@material-ui/core/Chip";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import NoMeetingRoomIcon from "@material-ui/icons/NoMeetingRoom";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

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
  },
  chip: {
    fontFamily: "Yekan",
    padding: theme.spacing(1)
  }
}));

interface IMarketCartProp {
  title: string;
  subtitle?: string;
  img: string;
  open: boolean;
  address?: string;
  discount?: number;
  freeDeliver?: boolean;
}

const MarketCart: React.FC<IMarketCartProp> = ({
  title,
  subtitle,
  img,
  open,
  address,
  discount,
  freeDeliver
}) => {
  // const MarketCart: React.FC = (title: string, subtitle: string, img: string) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cover}
        image={process.env.PUBLIC_URL + img}
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
          {subtitle !== undefined && (
            <Typography
              className={classes.persianfont}
              variant="subtitle1"
              color="textSecondary"
            >
              {subtitle}
            </Typography>
          )}
          {address !== undefined && (
            <Typography
              className={classes.persianfont}
              variant="subtitle1"
              color="textSecondary"
            >
              {address}
            </Typography>
          )}
          {open ? (
            <Chip
              icon={<MeetingRoomIcon />}
              label="باز است"
              clickable
              className={classes.chip}
              variant="outlined"
            />
          ) : (
            <Chip
              icon={<NoMeetingRoomIcon />}
              label="بسته است"
              clickable
              className={classes.chip}
              color="primary"
              variant="outlined"
            />
          )}
          {discount !== undefined && discount > 0 && (
            <Chip
              icon={<LoyaltyIcon />}
              label={discount + " درصد تخفیف"}
              clickable
              className={classes.chip}
              color="secondary"
              // variant="outlined"
            />
          )}
          {freeDeliver !== undefined && freeDeliver && (
            <Chip
              icon={<LocalShippingIcon />}
              label="تحویل رایگان"
              clickable
              className={classes.chip}
              color="secondary"
              // variant="outlined"
            />
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default MarketCart;

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
