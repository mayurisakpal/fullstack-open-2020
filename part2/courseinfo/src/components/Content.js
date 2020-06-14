import React from "react";

const Content = ({ parts }) =>
  parts.map(({ name, exercises }, index) => (
    <p key={index}>
      {name} {exercises}
    </p>
  ));

export default Content;
