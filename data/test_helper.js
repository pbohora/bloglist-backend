const Blog = require('../models/blog');
const User = require('../models/user');

const blogs = [
  {
    title: 'Data visualization',
    author: 'Annika',
    url: 'https://anni.com',
    likes: 3
  },
  {
    title: 'AI in new world',
    author: 'Silvi',
    url: 'https://jsasddi.com',
    likes: 5
  }
];

const blogInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON());
};

module.exports = { blogs, blogInDb, usersInDb };
