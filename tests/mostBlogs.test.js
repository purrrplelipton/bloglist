const listHelper = require("./test_helper");

describe("most blogs", () => {
  const blogList = listHelper.blogList;
  test("author with the most blogs", () => {
    const result = listHelper.mostBlogs(blogList);

    const obj = {};
    for (let i = 0; i < blogList.length; i++) {
      Object.prototype.hasOwnProperty.call(obj, blogList[i].author)
        ? (obj[blogList[i].author] += 1)
        : (obj[blogList[i].author] = 1);
    }
    const most_blog = Object.entries(obj).sort((x, y) => y[1] - x[1])[0];
    const blogInfo = { author: most_blog[0], blogs: most_blog[1] };
    expect(result).toEqual(blogInfo);
  });
});
