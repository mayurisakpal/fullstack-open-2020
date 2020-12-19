import React from 'react';
import './styles/app.css';
import AnecdoteForm from '../src/components/AnecdoteForm';
import AnecdoteList from '../src/components/AnecdoteList';

const App = () => {
  return (
    <>
      <h1>Anecdotes</h1>
      <AnecdoteForm />
      <AnecdoteList />
    </>
  );
};

export default App;