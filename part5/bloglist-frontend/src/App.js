import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import Notification from './components/Notification';
import { getAll, setToken, createBlog } from './services/blogs';
import AddBlogForm from './components/AddBlogForm';
import { login } from './services/login';
import './styles/app.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');
  const [notification, setNotification] = useState({});

  const getAllBlogs = async () => {
    try {
      const blogs = await getAll();
      setBlogs(blogs);
    } catch (error) {
      setNotification({
        message: 'Something went wrong',
        type: 'unsuccessful',
      });
      console.warn(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => setNotification({}), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const resetLoginForm = () => {
    setUsername('');
    setPassword('');
  };

  const isLoginDataValid = () => {
    if (!username || !password) {
      setNotification({
        message: 'Please fill both fields.',
        type: 'unsuccessful',
      });
      return;
    }
    return true;
  };

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();
    if (isLoginDataValid()) {
      try {
        const user = await login({ username, password });
        setToken(user.token);
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
        setUser(user);
        resetLoginForm();
      } catch (error) {
        if (error.response.status === 401) {
          setNotification({
            message: 'Wrong username or password',
            type: 'unsuccessful',
          });
        } else {
          console.warn(error);
        }
      }
    }
  };

  const handlePasswordOnchange = (event) => {
    setPassword(event.target.value);
  };

  const handleUsernameOnchange = (event) => {
    setUsername(event.target.value);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
  };

  const resetBlogForm = () => {
    setNewBlogTitle('');
    setNewBlogAuthor('');
    setNewBlogUrl('');
  };

  const handleTitleOnchange = (event) => {
    setNewBlogTitle(event.target.value);
  };
  const handleAuthorOnchange = (event) => {
    setNewBlogAuthor(event.target.value);
  };
  const handleUrlOnchange = (event) => {
    setNewBlogUrl(event.target.value);
  };

  const isNewBlogDataValid = () => {
    if (!newBlogTitle || !newBlogAuthor || !newBlogUrl) {
      setNotification({
        message: 'Please fill all fields',
        type: 'unsuccessful',
      });
      return;
    }
    return true;
  };

  const handleAddBlogFormSubmit = async (event) => {
    event.preventDefault();
    if (isNewBlogDataValid()) {
      const newObj = {
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl,
      };
      try {
        const response = await createBlog(newObj);
        console.log({ response });
        if (response) {
          setNotification({
            message: `A new blog ${newBlogTitle}, by ${newBlogAuthor} added`,
          });
        }
        resetBlogForm();
      } catch (error) {
        const { data, statusText } = error.response;
        setNotification({
          message: data.error || statusText,
          type: 'unsuccessful',
        });
        console.warn(error);
      }
    }
  };

  const renderBlogsWrapper = () => {
    return (
      <div>
        <h2 className='main-title'>Blogs</h2>
        <div className='user-introduction'>
          <h3>{user.name} logged in!</h3>&nbsp;
          <button onClick={handleLogout} className='btn'>
            Logout
          </button>
        </div>
        <AddBlogForm
          titleOnchange={handleTitleOnchange}
          authorOnchange={handleAuthorOnchange}
          urlOnchange={handleUrlOnchange}
          onFormSubmit={handleAddBlogFormSubmit}
        />
        <div className='blog-list-wrapper'>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}
      {user && user.token ? (
        renderBlogsWrapper()
      ) : (
        <Login
          onFormSubmit={handleLoginFormSubmit}
          passwordOnchange={handlePasswordOnchange}
          usernameOnchange={handleUsernameOnchange}
        />
      )}
    </>
  );
};

export default App;
