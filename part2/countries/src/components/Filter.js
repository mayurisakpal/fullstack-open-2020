import React from "react";

function Filter(props) {
  const { searchTerm, onChange } = props;
  return (
    <label>
      Find Countries:
      <input onChange={onChange} value={searchTerm} />
    </label>
  );
}

export default Filter;
