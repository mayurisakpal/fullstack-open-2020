import React from 'react';
import { connect } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = ({ addAnecdote }) => {

  const submitAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    if (anecdote) {
      addAnecdote(anecdote);
    }
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

const mapDispatchToProps = {
  addAnecdote
};

const connectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default connectedAnecdoteForm;
