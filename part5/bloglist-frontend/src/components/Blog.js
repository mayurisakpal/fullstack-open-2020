import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, onLikeClick, onRemoveClick, authUser }) => {
  const [isVisible, setVisible] = useState(false);

  const handleToggle = () => {
    setVisible(!isVisible);
  };

  return (
    <div className='mt-12 blog-list-item'>
      {blog.title}, by {blog.author}
      <button
        onClick={handleToggle}
        className='btn ml-8'
        data-test-id='toggleBlog'
      >
        {isVisible ? 'Hide' : 'View'}
      </button>
      {isVisible && (
        <>
          <ul data-test-id='blogDetailsList'>
            <li>{blog.url}</li>
            <li>
              Likes <span data-test-id='blogLikes'>{blog.likes}</span>
              <button
                onClick={onLikeClick.bind(null, blog.id)}
                className='btn ml-8'
                data-test-id='likeBlog'
              >
                Like
              </button>
            </li>
            <li>{blog.user.name}</li>
          </ul>
          {authUser.username === blog.user.username && (
            <button
              onClick={onRemoveClick.bind(
                null,
                blog.id,
                blog.title,
                blog.author
              )}
              data-test-id='removeBlog'
              className='btn mt-12 blog-item-remove-btn'
            >
              Remove
            </button>
          )}
        </>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    id: PropTypes.string.isRequired,
    url: PropTypes.string,
    likes: PropTypes.number,
  }).isRequired,
  onLikeClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  authUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
};
export default Blog;
