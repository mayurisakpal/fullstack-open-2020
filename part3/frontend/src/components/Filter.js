import React from "react";

const Filter = ({ handleSearch, searchTerm }) => (
  <div>
    <label>Filter shown with: </label>
    <input onChange={handleSearch} value={searchTerm} />
  </div>
);

export default Filter;
