import React from 'react';
import PropTypes from 'prop-types';

const AddBlogForm = ({
  titleOnchange,
  authorOnchange,
  urlOnchange,
  onFormSubmit,
  blogTitle,
  blogAuthor,
  blogUrl,
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
        value={blogTitle}
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
        value={blogAuthor}
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
        value={blogUrl}
      />
    </div>
    <button data-test-id='create' className='btn'>
      Create
    </button>
  </form>
);

AddBlogForm.prototype = {
  titleOnchange: PropTypes.func.isRequired,
  authorOnchange: PropTypes.func.isRequired,
  urlOnchange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  blogTitle: PropTypes.string.isRequired,
  blogAuthor: PropTypes.string.isRequired,
  blogUrl: PropTypes.string.isRequired,
};
export default AddBlogForm;
