const initialState = {
    message: '',
    type: 'successful',
    timer: 5000
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
export const addNotification = (content) => {
    return {
        type: 'ADD_NOTIFICATION',
        data: content
    };
};

export const showAndHideNotification = (dispatch, content) => {
    dispatch(addNotification(content));
    setTimeout(() => {
        dispatch(removeNotification());
    }, content.timer || initialState.timer);
};

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION',
    };
};

export default notificationReducer;