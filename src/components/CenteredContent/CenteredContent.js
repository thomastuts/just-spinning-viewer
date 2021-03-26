import React from "react";

import "./CenteredContent.scss";

const CenteredContent = ({ className, children }) => {
  return <div className="centered-content">{children}</div>;
};

export default CenteredContent;
