import React from "react";
import Header from "./Header";
import Total from "./Total";
import Content from "./Content";

const Course = ({ courses }) =>
  courses.map(({ name, id, parts }) => (
    <React.Fragment key={id}>
      <Header course={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </React.Fragment>
  ));

export default Course;
