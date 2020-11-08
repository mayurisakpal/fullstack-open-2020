const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.post('/', async (request, response, next) => {
  const { token, body } = request;

  try {
    const decodedToken = jwt.verify(token, config.JWT_SECRET);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'invalid token' });
    }
    if (!body.title || !body.url) {
      response.status(400).end();
    } else {
      const user = await User.findById(decodedToken.id);

      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
      });
      const savedBlogs = await blog.save();
      user.blogs = user.blogs.concat(savedBlogs._id);
      await user.save();
      response.status(201).json(savedBlogs.toJSON());
    }
  } catch (err) {
    next(err);
  }
});

blogRouter.delete('/:id', async (request, response, next) => {
  const { token, params } = request;
  const { id } = params || {};
  try {
    const decodedToken = jwt.verify(token, config.JWT_SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'invalid token' });
    }
    const blog = await Blog.findById(id);

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' }).end();
    }

    const isAuthUser = blog.user.toString() === decodedToken.id;

    if (isAuthUser) {
      await blog.remove();
      return response.status(204).end();
    } else {
      return response.status(403).json({ error: 'not authorized' }).end();
    }
  } catch (err) {
    next(err);
  }
});

blogRouter.put('/:id', async (request, response, next) => {
  const { token, params, body } = request;
  const { id } = params || {};

  const entry = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const decodedToken = jwt.verify(token, config.JWT_SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'invalid token' });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' }).end();
    }

    const isAuthUser = blog.user.toString() === decodedToken.id;

    if (isAuthUser) {
      const updatedEntry = await Blog.findByIdAndUpdate(id, entry, {
        new: true,
      });
      response.json(updatedEntry.toJSON());
    } else {
      return response.status(403).json({ error: 'not authorized' }).end();
    }
  } catch (err) {
    next(err);
  }
});

module.exports = blogRouter;
