import React from "react";

const Statistic = ({ text, value }) => (
  <tr>
    <th>{text}</th>
    <td>{value}</td>
  </tr>
);

export default Statistic;
