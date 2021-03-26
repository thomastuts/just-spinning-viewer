import React from "react";

const DebugJSON = ({ data }) => {
  return (
    <pre style={{ textTransform: "none", textAlign: "left" }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};

export default DebugJSON;
