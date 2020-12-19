const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  console.log('Current state: ', state);
  console.log('Action', action);
  const { type, data = {} } = action;
  switch (type) {
  case 'UPDATE_VOTE':
    return state.map(item => item.id === data.id ? { ...item, votes: item.votes + 1 } : item);
  case 'ADD_ANECDOTE':
    return [...state, data];
  default: return state;
  }
};

// action creators
export const updateVote = (id) => {
  return {
    type: 'UPDATE_VOTE',
    data: {
      id: id
    }
  };
};

export const addAnecdote = (content) => {
  return {
    type: 'ADD_ANECDOTE',
    data: asObject(content)
  };
};

export default reducer;