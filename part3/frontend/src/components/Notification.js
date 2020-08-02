import React from "react";
import PropTypes from "prop-types";

const Notification = ({ message, type }) => (
  <div
    className={`${
      type === "unsuccessful" ? "notification--error" : "notification--success"
    } notification`}
  >
    {message}
  </div>
);

Notification.propTypes = {
  type: PropTypes.oneOf(["successful", "unsuccessful"]),
};

Notification.defaultProps = {
  type: "successful",
};

export default Notification;
