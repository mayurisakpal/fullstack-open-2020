import React from 'react';
import { connect } from 'react-redux';
import { filterAnecdote } from '../reducers/filterReducer';

const Filter = ({ filter, filterAnecdote }) => {

  const handleChange = (event) => {
    filterAnecdote(event.target.value);
  };
  return (
    <div className='form-control'>
      <label htmlFor='filter'>Filter:</label>
      <input
        type='text'
        placeholder='Search'
        id='filter'
        className='input-field'
        onChange={handleChange}
        value={filter.filter}
      />
    </div>
  );
};

const mapStateToProps = ({ filter }) => {
  return { filter };
};

const mapDispatchToProps = {
  filterAnecdote
};

const connectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter);
export default connectedFilter;