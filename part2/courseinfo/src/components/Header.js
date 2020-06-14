import React from "react";

const Header = ({ course }) => (course ? <h1>{course}</h1> : null);

export default Header;
