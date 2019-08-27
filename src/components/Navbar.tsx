
import React from "react";
import Button from "@material/react-button";
import "@material/react-button/index.scss";

const Navbar: React.FC = () => {
  return (
    <div>
        <h3>Navbar page</h3>
        <Button
          raised
          className="button-alternate"
          onClick={() => console.log("clicked!")}
        >
          Click Me!
        </Button>
    </div>
  );
};

export default Navbar;

// https://reacttraining.com/react-router/web/guides/basic-components

// https://github.com/material-components/material-components-web-react
// https://react-mdc.github.io/#/