import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateVote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state).sort((first, second) => second.votes - first.votes);
  const dispatch = useDispatch();

  const handleVoteClick = (id) => {
    dispatch(updateVote(id));
  };

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id} className="mt-16">
        <div>
          {anecdote.content}
        </div>
        <div className="mt-8">
          Has {anecdote.votes}
          <button onClick={handleVoteClick.bind(null, anecdote.id)} className='btn ml-8'>Vote</button>
        </div>
      </div>
    )
  );
};

export default AnecdoteList;
