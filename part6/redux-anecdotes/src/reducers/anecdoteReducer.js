const anecdoteReducer = (state = [], action) => {
  const { type, data = {} } = action;
  switch (type) {
    case 'UPDATE_VOTE':
      return state.map(item => item.id === data.id ? { ...item, votes: item.votes + 1 } : item);
    case 'ADD_ANECDOTE':
      return [...state, data];
    case 'INIT_ANECDOTE':
      return [...data];
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
    data: content
  };
};

export const initAnecdote = (content) => {
  return {
    type: 'INIT_ANECDOTE',
    data: content
  };
};

export default anecdoteReducer;