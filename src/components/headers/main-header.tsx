import React, { useState, useEffect } from "react";
import MiniHeader from "./mini-header";
import BigHeader from "./big-header";

const MainHeader: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth <= 500);
    });
  });

  if (isMobile) {
    return <MiniHeader />;
  } else {
    return <BigHeader />;
  }
};

export default MainHeader;
