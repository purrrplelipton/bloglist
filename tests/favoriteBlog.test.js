const listHelper = require("./test_helper");

describe("favorite blog", () => {
  const blogList = listHelper.blogList;

  test("of a list with a blog", () => {
    const result = listHelper.favoriteBlog(blogList);

    const favoriteBlog = blogList.find(
      (blog) =>
        blog.likes ===
        blogList
          .map((blog) => blog.likes)
          .sort((a, b) => (b < a ? -1 : b > a ? 1 : 0))[0]
    );

    expect(result).toEqual({
      title: favoriteBlog.title,
      author: favoriteBlog.author,
      likes: favoriteBlog.likes,
    });
  });
});
