const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(blogs.map((blog) => blog.toJSON()));
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  console.log(request.token);
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
      return response
        .status(401)
        .json({ error: "token missing token or invalid" });
    }
    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
      content: body.content,
    });

    if (blog.title && blog.url) {
      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();
      await savedBlog
        .populate("user", {
          username: 1,
          name: 1,
        })
        .execPopulate();
      // console.log("userBlog", blogSaved);
      response.status(201).json(savedBlog.toJSON());
    } else {
      response.status(400).end();
    }
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const token = request.token;
  console.log(token);
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken) {
      return response
        .status(401)
        .json({ error: "token missing token or invalid" });
    }
    const user = await User.findById(decodedToken.id);
    const blog = await Blog.findById(request.params.id);
    const userId = user._id;
    if (userId.toString() === blog.user.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      response.status(401).end();
    }
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  try {
    const blog = {
      likes: body.likes,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    }).populate("user", {
      username: 1,
      name: 1,
    });
    response.json(updatedBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
