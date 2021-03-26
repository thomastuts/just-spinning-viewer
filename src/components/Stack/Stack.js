import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import styles from "./Stack.scss";

const getSpacingClassForSpacingUnit = (spacingUnit) => {
  switch (spacingUnit) {
    case "extra-small":
      return "stackSpacingExtraSmall";
    case "small":
      return "stackSpacingSmall";
    case "default":
      return "stackSpacingDefault";
  }
};

const Stack = ({
  as = "div",
  children,
  className,
  horizontal,
  vertical,
  spacing,
  ...rest
}) => {
  const classes = classNames(
    "stack",
    {
      stackHorizontal: horizontal,
      stackVertical: vertical,
    },
    getSpacingClassForSpacingUnit(spacing),
    className
  );

  return React.createElement(as, {
    className: classes,
    children,
    ...rest,
  });
};

Stack.propTypes = {
  className: PropTypes.string,
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool,
  spacing: PropTypes.oneOf(["extra-small", "small", "default", "large"]),
};

export default Stack;
