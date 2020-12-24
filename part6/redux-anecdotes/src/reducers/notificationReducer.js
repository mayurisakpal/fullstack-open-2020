import { NOTIFICATION_HIDE_DEFAULT_TIME } from '../constants'

const initialState = {
  message: '',
  type: 'successful'
};

const notificationReducer = (state = initialState, action) => {
  const { type, data = {} } = action;
  switch (type) {
    case 'ADD_NOTIFICATION':
      return { ...state, ...data };
    case 'REMOVE_NOTIFICATION':
      return initialState;
    default: return state;
  }
};

// action creators
export const setNotification = (data, hideTime = NOTIFICATION_HIDE_DEFAULT_TIME) => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      data: data
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      })
    }, hideTime);
  }
}

export default notificationReducer;