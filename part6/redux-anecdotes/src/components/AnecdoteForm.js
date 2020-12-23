import React from 'react';
import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { showAndHideNotification } from '../reducers/notificationReducer';
import { createAnecdote } from '../services/anecdotes';
import store from '../store';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const submitAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    if (anecdote) {
      try {
        const data = {
          content: anecdote,
          votes: 0
        }
        const postAnecdote = await createAnecdote(data)
        dispatch(addAnecdote(postAnecdote))
        const message = `You have added '${anecdote}'`;
        showAndHideNotification(store.dispatch, { message, type: 'successful' });
        // reset the input
        event.target.anecdote.value = '';
      } catch (error) {
        showAndHideNotification(store.dispatch, { message: 'Something went wrong', type: 'unsuccessful' });
      }
    }
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
