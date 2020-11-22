import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  const blog = {
    title: 'Blog title',
    author: 'Blog author',
    url: 'www.web.com',
    id: '1',
    likes: 16,
    user: { name: 'Auth user' },
  };
  const onLikeClick = jest.fn();
  const onRemoveClick = jest.fn();
  const authUser = { name: 'Auth user', username: 'user' };

  test('renders the blogs title and author, but does not render its url or number of likes by default', () => {
    const { container, queryByText } = render(
      <Blog
        blog={blog}
        onLikeClick={onLikeClick}
        onRemoveClick={onRemoveClick}
        authUser={authUser}
      />
    );

    expect(container).toHaveTextContent(blog.title);
    expect(container).toHaveTextContent(blog.author);
    expect(queryByText(blog.author)).toBeDefined();
    expect(queryByText(blog.url)).toBe(null);
    expect(queryByText(blog.user.name)).toBe(null);
    expect(queryByText(blog.likes + '')).toBe(null);
  });

  test('the blogs url and number of likes are shown when the button controlling the shown details has been clicked', () => {
    const { container, getByText } = render(
      <Blog
        blog={blog}
        onLikeClick={onLikeClick}
        onRemoveClick={onRemoveClick}
        authUser={authUser}
      />
    );

    const viewButton = getByText(/View/i, {
      selector: 'button',
    });

    fireEvent.click(viewButton);

    expect(container).toHaveTextContent('Like');
    expect(container).toHaveTextContent(blog.url);
    expect(container).toHaveTextContent(blog.likes);
  });

  test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
    const { container, getByText } = render(
      <Blog
        blog={blog}
        onLikeClick={onLikeClick}
        onRemoveClick={onRemoveClick}
        authUser={authUser}
      />
    );

    const viewButton = getByText(/View/i, {
      selector: 'button',
    });

    fireEvent.click(viewButton);

    expect(container).toHaveTextContent('Like');

    const likeButton = getByText(/like/i, {
      selector: 'button',
    });

    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(onLikeClick).toHaveBeenCalledTimes(2);
  });
});
