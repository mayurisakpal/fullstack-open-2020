import { getAll, updateAnecdote, createAnecdote } from '../services/anecdotes';
import { setNotification } from '../reducers/notificationReducer';

const anecdoteReducer = (state = [], action) => {
  const { type, data = {} } = action;
  switch (type) {
  case 'UPDATE_VOTE':
    return state.map(item => item.id === data.id ? data : item);
  case 'ADD_ANECDOTE':
    return [...state, data];
  case 'INIT_ANECDOTE':
    return [...data];
  default: return state;
  }
};

// action creators
export const updateVote = (id, data) => {
  return async dispatch => {
    try {
      const updatedData = { ...data, votes: data.votes + 1 };
      await updateAnecdote(id, updatedData);
      dispatch({
        type: 'UPDATE_VOTE',
        data: updatedData
      });

      const message = `You have voted '${data.content}'`;
      dispatch(setNotification({
        message: message,
        type: 'successful'
      }));
    } catch (error) {
      dispatch(setNotification({
        message: 'Something went wrong',
        type: 'unsuccessful'
      }));
      console.warn(error);
    }
  };
};

export const addAnecdote = (content) => {
  return async dispatch => {
    try {
      const data = {
        content: content,
        votes: 0
      };
      const postAnecdote = await createAnecdote(data);
      dispatch({
        type: 'ADD_ANECDOTE',
        data: postAnecdote
      });
      const message = `You have added '${postAnecdote.content}'`;
      dispatch(setNotification({
        message: message,
        type: 'successful'
      }));
    } catch (error) {
      dispatch(setNotification({
        message: 'Something went wrong',
        type: 'unsuccessful'
      }));
      console.warn(error);
    }
  };
};

export const initAnecdote = () => {
  return async dispatch => {
    try {
      const anecdotes = await getAll();
      dispatch({
        type: 'INIT_ANECDOTE',
        data: anecdotes
      });
    } catch (error) {
      dispatch(setNotification({
        message: 'Something went wrong',
        type: 'unsuccessful'
      }));
      console.warn(error);
    }
  };
};

export default anecdoteReducer;