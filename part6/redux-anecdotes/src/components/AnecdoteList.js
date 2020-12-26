import React from 'react';
import { connect } from 'react-redux';
import { updateVote } from '../reducers/anecdoteReducer';

const AnecdoteList = ({ anecdotes, updateVote }) => {
  const handleVoteClick = (anecdote) => {
    updateVote(anecdote.id, anecdote);
  };

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id} className="mt-16">
        <div>
          {anecdote.content}
        </div>
        <div className="mt-8">
          Has {anecdote.votes}
          <button onClick={handleVoteClick.bind(null, anecdote)} className='btn ml-8'>Vote</button>
        </div>
      </div>
    )
  );
};

const mapStateToProps = ({ filter, anecdote = [] }) => {
  const anecdotes = anecdote.sort((first, second) => second.votes - first.votes).filter(item => item.content && item.content.toLowerCase().includes(filter.filter.toLowerCase()));

  return {
    anecdotes
  };
};

const mapDispatchToProps = {
  updateVote,
};

const connectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
export default connectedAnecdoteList;
