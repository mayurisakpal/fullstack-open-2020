import React, { useState } from 'react';
const Blog = ({ blog, onLikeClick, onRemoveClick, authUser }) => {
  const [isVisible, setVisible] = useState(false);

  const handleToggle = () => {
    setVisible(!isVisible);
  };

  return (
    <div className='mt-12 blog-list-item'>
      {blog.title}, by {blog.author}
      <button onClick={handleToggle} className='btn ml-8'>
        {isVisible ? 'Hide' : 'View'}
      </button>
      {isVisible && (
        <>
          <ul>
            <li>{blog.url}</li>
            <li>
              Likes {blog.likes}
              <button
                onClick={onLikeClick.bind(null, blog.id)}
                className='btn ml-8'
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

export default Blog;
