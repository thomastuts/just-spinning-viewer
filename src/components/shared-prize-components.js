import React from "react";

import "./shared-prize-components.scss";

export const PrizeTitle = ({ children }) => {
  return <h1 className="prize-title">{children}</h1>;
};

export const PrizeDescription = ({ children }) => {
  return <p className="prize-description">{children}</p>;
};

export const MainContentGrid = ({ children, gridTemplateColumns }) => {
  return (
    <div className="main-content-grid" style={{ gridTemplateColumns }}>
      {children}
    </div>
  );
};
