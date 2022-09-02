const listHelper = require("./test_helper");

describe("total likes", () => {
  const blogList = listHelper.blogList;

  test("of a list with a blog", () => {
    const result = listHelper.totalLikes(blogList);

    expect(result).toEqual(
      blogList
        .map((blog) => blog.likes)
        .reduce((accumulator, blogLikes) => accumulator + blogLikes, 0)
    );
  });
});
