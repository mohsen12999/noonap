import React, { useState, useEffect } from "react";
import MiniHeader from "./mini-header";
import BigHeader from "./big-header";

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState({});

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile({ isMobile: window.innerWidth <= 500 });
    });
  });

  if (isMobile) {
    return <MiniHeader />;
  } else {
    return <BigHeader />;
  }
};

export default Header;
