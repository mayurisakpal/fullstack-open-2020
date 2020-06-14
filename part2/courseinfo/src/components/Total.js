import React from "react";

const Total = ({ parts }) => {
  let total = parts.reduce((a, b) => a + b.exercises, 0);
  return <h3>Total of {total} exercises</h3>;
};

export default Total;
