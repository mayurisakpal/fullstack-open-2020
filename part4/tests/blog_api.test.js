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

describe('Like property of blogs', function () {
  test('should default to 0 if likes are missing', async () => {
    const newBlogPost = {
      title: 'New blog Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    };

    const blogsList = await api
      .post('/api/blogs')
      .send(newBlogPost)
      .set('Accept', 'application/json')
      .expect(201);

    expect(blogsList.body).toHaveProperty('likes', 0);
  });

  test('should return given like', async () => {
    const newBlogPost = {
      title: 'New blog Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 16,
    };

    const blogsList = await api
      .post('/api/blogs')
      .send(newBlogPost)
      .set('Accept', 'application/json')
      .expect(201);

    expect(blogsList.body).toHaveProperty('likes', 16);
  });
});

describe('Requried properties missing', function () {
  test('should return status code 400 Bad Request when title property is missing', async () => {
    const newBlogPost = {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    };

    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .set('Accept', 'application/json')
      .expect(400);
  });

  test('should return status code 400 Bad Request when url property is missing', async () => {
    const newBlogPost = {
      title: 'New blog Canonical string reduction',
      author: 'Edsger W. Dijkstra',
    };

    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .set('Accept', 'application/json')
      .expect(400);
  });
});

describe('DELETE /blogs', function () {
  test('should delete a blog witch has given id and return 204', async () => {
    await api.delete('/api/blogs/5fa40c1882a55603f0b5330c').expect(204);
  });

  test('should return error if given id is missing', async () => {
    await api.delete('/api/blogs/5fa40c1882a').expect(400);
  });
});

describe('PUT /blogs', function () {
  test('should update the content of blog which has given id', async () => {
    const blogs = await api.get('/api/blogs');
    const id = blogs.body[0].id;

    const updatedEntry = {
      likes: 50,
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      url:
        'https://i.picsum.photos/id/787/200/200.jpg?hmac=CBLWRcHYFRDgc9zVqCgHmh5o2J6ADdShlYwX6ZKfqA4',
    };
    const updatedBlog = await api
      .put(`/api/blogs/${id}`)
      .send(updatedEntry)
      .set('Accept', 'application/json')
      .expect(200);

    expect(updatedBlog.body).toHaveProperty('likes', 50);
  });

  test('should throw an error if id is not valid', async () => {
    const updatedEntry = {
      likes: 1,
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      url:
        'https://i.picsum.photos/id/787/200/200.jpg?hmac=CBLWRcHYFRDgc9zVqCgHmh5o2J6ADdShlYwX6ZKfqA4',
    };
    await api.put('/api/blogs/5fa40c1282a55b').send(updatedEntry).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
