import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles:any = makeStyles({
  mainTitle: {
    fontFamily: "Yekan"
  },
  companyLink: {
    fontFamily: "Yekan",
    padding: "2px"
  }
});

const Address: React.FC = () => {
  const classes:any = useStyles();

  return (
    <Container maxWidth="md">
      <p>address page</p>
    </Container>
  );
};

export default Address;
