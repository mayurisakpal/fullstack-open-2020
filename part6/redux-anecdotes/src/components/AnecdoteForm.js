import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const submitAnecdote = (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    if (anecdote) {
      dispatch(addAnecdote(anecdote));
    }
    // reset the input
    event.target.anecdote.value = '';
  };

  return (
    <>
      <h2>Create new anecdote</h2>
      <form onSubmit={submitAnecdote}>
        <div className='form-control'>
          <label htmlFor='anecdote'>Anecdote:</label>
          <input
            type='text'
            placeholder='Enter Anecdote'
            id='anecdote'
            className='input-field'
          />
        </div>

        <button data-test-id='create' className='btn'>
          Create
        </button>
      </form>
    </>
  );
};

export default AnecdoteForm;
