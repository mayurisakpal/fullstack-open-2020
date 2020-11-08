const User = require('../models/user');
const Blog = require('../models/blog');

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((u) => u.toJSON());
};

module.exports = {
  usersInDb,
  blogsInDb,
};
