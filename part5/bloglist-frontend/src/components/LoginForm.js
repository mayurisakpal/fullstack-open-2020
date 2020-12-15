import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({
  onFormSubmit,
  usernameOnchange,
  passwordOnchange,
  username,
  password,
}) => {
  return (
    <>
      <h2>Login to the account!</h2>
      <form onSubmit={onFormSubmit}>
        <div className='form-control'>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            placeholder='Enter username'
            id='username'
            onChange={usernameOnchange}
            className='input-field'
            value={username}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            placeholder='Enter password'
            id='password'
            onChange={passwordOnchange}
            className='input-field'
            password={password}
          />
        </div>
        <button id='loginButton' className='btn'>
          Login
        </button>
      </form>
    </>
  );
};

LoginForm.prototype = {
  onFormSubmit: PropTypes.func.isRequired,
  usernameOnchange: PropTypes.func.isRequired,
  passwordOnchange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
