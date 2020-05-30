import React from "react";

const Total = ({ parts }) => {
  let total = 0;
  for (let i = 0; i < parts.length; i++) {
    const current = parts[i];
    total += current.exercises;
  }
  return <p>Number of exercises {total}</p>;
};

export default Total;
