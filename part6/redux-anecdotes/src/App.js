import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AnecdoteForm from '../src/components/AnecdoteForm';
import AnecdoteList from '../src/components/AnecdoteList';
import Notification from '../src/components/Notification';
import Filter from '../src/components/Filter';
import { initAnecdote } from '../src/reducers/anecdoteReducer';
import './styles/app.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAnecdote());
  }, [dispatch]);

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