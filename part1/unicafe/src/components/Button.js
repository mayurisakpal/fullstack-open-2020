import React from "react";

const Button = ({ children, onClick }) =>
  children ? <button onClick={onClick}>{children}</button> : null;

export default Button;
