const initialState = {
  filter: '',
};

const filterReducer = (state = initialState, action) => {
  const { type, data = {} } = action;
  switch (type) {
  case 'FILTER_ANECDOTE':
    return { filter: data.filter };
  default: return state;
  }
};

// action creators
export const filterAnecdote = (searchString) => {
  return {
    type: 'FILTER_ANECDOTE',
    data: {
      filter: searchString
    }
  };
};

export default filterReducer;