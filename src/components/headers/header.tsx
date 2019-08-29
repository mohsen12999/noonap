import React from "react";
import MiniHeader from "./mini-header";
import BigHeader from "./big-header";

const Header: React.FC = () => {
  const isMobile: boolean = window.innerWidth <= 500;

  if (isMobile) {
    return <MiniHeader />;
  } else {
    return <BigHeader />;
  }
};

export default Header;
