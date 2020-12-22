import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/notification.css';

const Notification = () => {
  const { message, type } = useSelector(state => state.notification);

  return (
    message &&
    <div
      className={`${type === 'unsuccessful' ? 'notification--error' : 'notification--success'
      } notification`}
    >
      {message}
    </div>
  );
};

export default Notification;