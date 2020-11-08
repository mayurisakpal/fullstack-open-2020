var _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs = []) => {
  return blogs.reduce((first, second) => first + second.likes, 0);
};

const favoriteBlog = (blogs = []) => {
  const maxFavourite = Math.max(...blogs.map((item) => item.likes));
  return blogs.find((item) => item.likes === maxFavourite);
};

const mostBlogs = (blogs = []) => {
  const authorAndBlogsArr = _.chain(blogs)
    .countBy('author')
    .toPairs()
    .maxBy((item) => item[1])
    .value();

  return (
    authorAndBlogsArr && {
      author: authorAndBlogsArr[0],
      blogs: authorAndBlogsArr[1],
    }
  );
};

const mostLikes = (blogs = []) => {
  let authorAndLikesObj = {};
  for (let el of blogs) {
    if (authorAndLikesObj.hasOwnProperty(el.author)) {
      authorAndLikesObj[el.author] += el.likes;
    } else {
      authorAndLikesObj[el.author] = el.likes;
    }
  }

  const authorAndLikesArr = _.chain(authorAndLikesObj)
    .toPairs()
    .maxBy((item) => item[1])
    .value();

  return (
    authorAndLikesArr && {
      author: authorAndLikesArr[0],
      likes: authorAndLikesArr[1],
    }
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
