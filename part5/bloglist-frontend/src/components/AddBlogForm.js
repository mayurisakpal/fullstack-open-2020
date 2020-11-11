import React from 'react';

const AddBlogForm = ({
  titleOnchange,
  authorOnchange,
  urlOnchange,
  onFormSubmit,
}) => (
  <form onSubmit={onFormSubmit}>
    <div className='form-control'>
      <label htmlFor='title'>Title:</label>
      <input
        type='text'
        placeholder='Enter title of the blog'
        id='title'
        onChange={titleOnchange}
        className='input-field'
      />
    </div>
    <div className='form-control'>
      <label htmlFor='author'>Author:</label>
      <input
        type='text'
        placeholder='Enter author of the blog'
        id='author'
        onChange={authorOnchange}
        className='input-field'
      />
    </div>
    <div className='form-control'>
      <label htmlFor='url'>Url:</label>
      <input
        type='text'
        placeholder='Enter url of the blog'
        id='url'
        onChange={urlOnchange}
        className='input-field'
      />
    </div>
    <button className='btn'>Create</button>
  </form>
);

export default AddBlogForm;
