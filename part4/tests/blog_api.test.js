const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await new Blog(blogs[0]).save();
  await new Blog(blogs[1]).save();
  await new Blog(blogs[2]).save();
});

describe('GET /blogs', function () {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('returns the correct number of blogs', async () => {
    const blogs = await api.get('/api/blogs');
    expect(blogs.body.length).toBe(3);
  });

  test('blogs have an unique identifier id property', async () => {
    const blogs = await api.get('/api/blogs');
    expect(blogs.body[0].id).toBeDefined();
  });
});

describe('POST /blogs', function () {
  test('should create new blog', async () => {
    const newBlogPost = {
      title: 'New blog Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    };
    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .set('Accept', 'application/json')
      .expect(201);

    const blogsList = await api.get('/api/blogs');
    // test if the total number of blogs in the system is increased by one
    expect(blogsList.body.length).toBe(blogs.length + 1);
    // test if the content of the blog post is saved correctly
    expect(blogsList.body).toContainEqual(expect.objectContaining(newBlogPost));
  });
});

afterAll(() => {
  mongoose.connection.close();
});
