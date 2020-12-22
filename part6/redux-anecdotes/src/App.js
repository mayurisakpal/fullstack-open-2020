import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import AnecdoteForm from '../src/components/AnecdoteForm';
import AnecdoteList from '../src/components/AnecdoteList';
import Notification from '../src/components/Notification';
import Filter from '../src/components/Filter';
import { getAll } from '../src/services/anecdotes';
import { initAnecdote } from '../src/reducers/anecdoteReducer';
import { showAndHideNotification } from '../src/reducers/notificationReducer';
import store from '../src/store';

import './styles/app.css';
const App = () => {
  const dispatch = useDispatch();

  const initAllAnecdote = useCallback(async () => {
    try {
      const anecdotes = await getAll();
      dispatch(initAnecdote(anecdotes));
    } catch (error) {
      showAndHideNotification(store.dispatch, {
        message: 'Something went wrong',
        type: 'unsuccessful',
      });
      console.warn(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initAllAnecdote();
  }, [initAllAnecdote]);

  return (
    <>
      <h1>Anecdotes</h1>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </>
  );
};

export default App;