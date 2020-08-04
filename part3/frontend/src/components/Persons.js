import React from "react";

const Persons = ({ data, searchTerm, onDeleteButtonClick }) => {
  const handleDeletButtonClick = (id, name) => {
    if (onDeleteButtonClick) {
      onDeleteButtonClick(id, name);
    }
  };
  return (
    !!data.length &&
    data.map(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) && (
          <p key={item.id}>
            {item.name} : {item.number}
            <button
              onClick={handleDeletButtonClick.bind(null, item.id, item.name)}
            >
              Delete
            </button>
          </p>
        )
    )
  );
};

export default Persons;
