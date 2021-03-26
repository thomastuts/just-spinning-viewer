import React from "react";
import { motion } from "framer-motion";

import "./AnimatedBackground.scss";

const Circle = ({ width, expandedWidth }) => {
  return (
    <motion.div
      animate={{
        width: [width, expandedWidth, width],
        height: [width, expandedWidth, width],
      }}
      transition={{ duration: 8, repeat: Infinity }}
      className="animated-background__circle"
      //style={{ width, height: width }}
    />
  );
};

const AnimatedBackground = () => {
  return (
    <div className="animated-background">
      <Circle width="30vw" expandedWidth="40vw" />
      <Circle width="50vw" expandedWidth="60vw" />
      <Circle width="70vw" expandedWidth="80vw" />
      <Circle width="90vw" expandedWidth="100vw" />
    </div>
  );
};

export default AnimatedBackground;
