import React from 'react';

const Login = ({ onFormSubmit, usernameOnchange, passwordOnchange }) => {
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
          />
        </div>
        <button className='btn'>Login</button>
      </form>
    </>
  );
};

export default Login;
