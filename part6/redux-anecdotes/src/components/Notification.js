import React from 'react';
import { connect } from 'react-redux';
import '../styles/notification.css';

const Notification = ({ message, type }) => {
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

const mapStateToProps = ({ notification }) => {
  const { message, type } = notification;
  return {
    message,
    type
  };
};

const connectedNotification = connect(mapStateToProps)(Notification);
export default connectedNotification;