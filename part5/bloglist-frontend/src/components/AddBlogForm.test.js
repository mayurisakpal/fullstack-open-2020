import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import AddBlogForm from './AddBlogForm';

describe('<Blog />', () => {
  const titleOnchange = jest.fn();
  const authorOnchange = jest.fn();
  const urlOnchange = jest.fn();
  const onFormSubmit = jest.fn();
  const blogTitle = 'Blog title';
  const blogAuthor = 'Blog author';
  const blogUrl = 'Blog url';

  test('calls the event handler it received as props', () => {
    const { container, queryByText } = render(
      <AddBlogForm
        titleOnchange={titleOnchange}
        authorOnchange={authorOnchange}
        urlOnchange={urlOnchange}
        onFormSubmit={onFormSubmit}
      />
    );

    const form = container.querySelector('form');
    const titleInput = container.querySelector('#title');
    const authorInput = container.querySelector('#author');
    const urlInput = container.querySelector('#url');

    fireEvent.change(titleInput, {
      target: { value: blogTitle },
    });
    fireEvent.change(authorInput, {
      target: { value: blogAuthor },
    });
    fireEvent.change(urlInput, {
      target: { value: blogUrl },
    });

    fireEvent.submit(form);

    expect(titleOnchange).toBeCalledTimes(1);
    expect(titleInput.value).toEqual(blogTitle);
    expect(authorOnchange).toBeCalledTimes(1);
    expect(authorInput.value).toEqual(blogAuthor);
    expect(urlOnchange).toBeCalledTimes(1);
    expect(urlInput.value).toEqual(blogUrl);
    expect(onFormSubmit).toBeCalledTimes(1);
  });
});
