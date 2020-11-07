const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.post('/', async (request, response, next) => {
  const body = request.body;

  if (!body.title || !body.url) {
    response.status(400).end();
  } else {
    const user = await User.findById(body.userId);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });

    try {
      const savedBlogs = await blog.save();
      user.blogs = user.blogs.concat(savedBlogs._id);
      await user.save();
      response.status(201).json(savedBlogs.toJSON());
    } catch (err) {
      next(err);
    }
  }
});

blogRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id;
  try {
    await Blog.findByIdAndDelete(id);
    response.status(204).end();
  } catch (err) {
    next(err);
  }
});

blogRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id;

  const entry = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  };

  try {
    const updatedEntry = await Blog.findByIdAndUpdate(id, entry, {
      new: true,
    });

    if (updatedEntry) {
      response.json(updatedEntry.toJSON());
    } else {
      response.status(404).end();
    }
  } catch (err) {
    next(err);
  }
});

module.exports = blogRouter;
