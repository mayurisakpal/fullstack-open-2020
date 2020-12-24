import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateVote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const { filter, anecdote: anecdoteList } = useSelector(state => state) || {};
  const anecdotes = anecdoteList.sort((first, second) => second.votes - first.votes).filter(item => item.content && item.content.toLowerCase().includes(filter.filter.toLowerCase()));
  const dispatch = useDispatch();

  const handleVoteClick = (anecdote) => {
    dispatch(updateVote(anecdote.id, anecdote));
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

export default AnecdoteList;
