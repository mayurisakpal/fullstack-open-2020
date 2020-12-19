import React from 'react';
import './styles/app.css';
import AnecdoteForm from '../src/components/AnecdoteForm';
import AnecdoteList from '../src/components/AnecdoteList';
import Notification from '../src/components/Notification';
import Filter from '../src/components/Filter';

const App = () => {
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