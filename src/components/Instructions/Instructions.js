import React from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

import "./Instructions.scss";

const Instructions = ({ children, instructionsFor, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: [0.9, 1.1, 1] }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: 4, type: "spring", duration: 1 }}
      className={classNames("instructions", className)}
    >
      <header>Instructions for {instructionsFor}</header>
      {children}
    </motion.div>
  );
};

export default Instructions;
