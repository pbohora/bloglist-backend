const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  const totalLikes = blogs.map(blog => blog.likes).reduce((a, b) => a + b, 0);
  return totalLikes;
};

const favoriteBlog = blogs => {
  const favoriteBlog = blogs.reduce((maxFavorite, minFavorite) =>
    maxFavorite.likes > minFavorite.likes ? maxFavorite : minFavorite
  );
  return favoriteBlog;
};

const mostBlog = () => {};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
