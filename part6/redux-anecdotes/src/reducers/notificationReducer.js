import { NOTIFICATION_HIDE_DEFAULT_TIME } from '../constants';

const initialState = {
  message: '',
  type: 'successful',
  activeId: null
};

const notificationReducer = (state = initialState, action) => {
  const { type, data = {} } = action;
  switch (type) {
  case 'ADD_NOTIFICATION':
    return { ...state, ...data };
  case 'SET_ACTIVE_ID':
    return { ...state, activeId: data.id };
  case 'REMOVE_NOTIFICATION':
    return initialState;
  default: return state;
  }
};

// action creators
export const setNotification = (data, hideTime = NOTIFICATION_HIDE_DEFAULT_TIME) => {
  return async (dispatch, getState) => {
    const ongoingNotification = getState().notification.activeId;

    if (ongoingNotification) {
      clearTimeout(ongoingNotification);
    }
    dispatch({
      type: 'ADD_NOTIFICATION',
      data: data
    });
    const notificationId = setTimeout(() => {
      if (ongoingNotification !== notificationId) {
        dispatch({
          type: 'REMOVE_NOTIFICATION',
        });
      }
    }, hideTime);
    dispatch({
      type: 'SET_ACTIVE_ID',
      data: { id: notificationId }
    });
  };
};

export default notificationReducer;