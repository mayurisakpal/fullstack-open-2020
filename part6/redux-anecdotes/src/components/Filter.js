import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterAnecdote } from '../reducers/filterReducer';

const Filter = () => {
  const { filter } = useSelector(state => state.filter);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(filterAnecdote(event.target.value));
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

export default Filter;