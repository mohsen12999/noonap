import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  mainTitle: {
    fontFamily: "Yekan"
  },
  companyLink: {
    fontFamily: "Yekan",
    padding: "2px"
  }
});

const Address: React.FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <h3 className={classes.mainTitle}>درباره ما</h3>
      <p className={classes.mainTitle}>
        کلیه حقوق مادی و معنوی اپلیکیشن نون متعلق به شرکت
        <a
          className={classes.companyLink}
          href="http://www.apdr.ir"
          title="وب سایت شرکت کاوشگران البرز"
        >
          کاوشگران البرز
        </a>
        می‌باشد.
      </p>
      <h3 className={classes.mainTitle}>آدرس</h3>
      <p className={classes.mainTitle}>
        رامسر - خیابان مطهری - جنب بانک صادرات مرکزی - طبقه دوم - شرکت کاوشگران
        البرز
      </p>
    </Container>
  );
};

export default Address;
