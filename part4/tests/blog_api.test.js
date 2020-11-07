const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('../utils/test_helper');

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

let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await new Blog(blogs[0]).save();
  await new Blog(blogs[1]).save();
  await new Blog(blogs[2]).save();

  await User.deleteMany({});
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash('testPassword', saltRounds);
  const user = new User({ username: 'testUser', passwordHash });

  await user.save();

  await api
    .post('/api/login')
    .send({ username: 'testUser', password: 'testPassword' })
    .then((response) => {
      token = response.body.token;
    });
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
  test('should create new blog if user is authorized', async () => {
    const newBlogPost = {
      title: 'New blog Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlogPost)
      .set('Accept', 'application/json')
      .expect(201);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogs.length + 1);

    expect(blogsAtEnd).toContainEqual(expect.objectContaining(newBlogPost));
  });

  test('should not create a blog if user is not authenticate', async () => {
    const newBlogPost = {
      title: 'New blog Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    };
    const invalidToken = null;

    const blog = await api
      .post('/api/blogs')
      .send(newBlogPost)
      .set('Authorization', `Bearer ${invalidToken}`)
      .set('Accept', 'application/json');

    expect(blog.status).toBe(401);
    expect(blog.body.error).toBe('invalid token');
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogs.length);
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
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect(201);

    expect(blogsList.body).toHaveProperty('likes', 16);
  });
});

describe('Required properties missing', function () {
  test('should return status code 400 Bad Request when title property is missing', async () => {
    const newBlogPost = {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    };

    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect(400);
  });
});

describe('DELETE /blogs', function () {
  test('should delete a blog witch has given id and user is owner of the blog and return 204', async () => {
    const newBlogPost = {
      title: 'New blog Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 18,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlogPost);

    const blogsAtStart = await helper.blogsInDb();
    const idToDelete = blogsAtStart[blogsAtStart.length - 1].id;
    await api
      .delete(`/api/blogs/${idToDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtStart).toHaveLength(blogsAtEnd.length + 1);
  });

  test('should not allow user to delete a blog if user is not valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const idToDelete = blogsAtStart[blogsAtStart.length - 1].id;

    const invalidToken = '1fa6878cf6e4230fa48cb96b';
    const blog = await api
      .delete(`/api/blogs/${idToDelete}`)
      .set('Authorization', `Bearer ${invalidToken}`)
      .expect(401);

    expect(blog.body.error).toBe('invalid token');
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtStart).toHaveLength(blogsAtEnd.length);
  });

  test('should return error if given id is missing', async () => {
    await api
      .delete('/api/blogs/1fa6878cf6e4230fa48cb96b')
      .set('Authorization', `Bearer ${token}`)
      .expect(404);
  });
});

describe('PUT /blogs', function () {
  test('should update the content of blog which has given id', async () => {
    const newBlogPost = {
      title: 'New blog Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 200,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlogPost);

    const blogsAtStart = await helper.blogsInDb();
    const idToUpdate = blogsAtStart[blogsAtStart.length - 1].id;

    const updatedEntry = {
      likes: 50,
    };
    const updatedBlog = await api
      .put(`/api/blogs/${idToUpdate}`)
      .send(updatedEntry)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect(200);

    expect(updatedBlog.body).toHaveProperty('likes', 50);
  });

  test('should not allow user to update a blog if user is not valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const idToUpdate = blogsAtStart[blogsAtStart.length - 1].id;
    const invalidToken = '1fa6878cf6e4230fa48cb96b';

    const updatedEntry = {
      likes: 50,
    };
    const updatedBlog = await api
      .put(`/api/blogs/${idToUpdate}`)
      .send(updatedEntry)
      .set('Authorization', `Bearer ${invalidToken}`)
      .set('Accept', 'application/json')
      .expect(401);

    expect(updatedBlog.body.error).toBe('invalid token');
  });

  test('should throw an error if id is not valid', async () => {
    const updatedEntry = {
      likes: 1,
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      url:
        'https://i.picsum.photos/id/787/200/200.jpg?hmac=CBLWRcHYFRDgc9zVqCgHmh5o2J6ADdShlYwX6ZKfqA4',
    };
    await api
      .put('/api/blogs/1fa6878cf6e4230fa48cb96b')
      .send(updatedEntry)
      .set('Authorization', `Bearer ${token}`)
      .expect(404);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
