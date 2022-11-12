const listHelper = require('../utils/test_helper')

test('total likes of all blogs', () => {
  const result = listHelper.blogList
    .map((blog) => blog.likes)
    .reduce((x, y) => x + y, 0)

  expect(result).toBe(36)
})

test('favorite blog', () => {
  const favBlog = listHelper.blogList.find(
    (blog) =>
      blog.likes ===
      listHelper.blogList.map((blog) => blog.likes).sort((a, b) => b - a)[0]
  )
  const result = {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes
  }

  expect(result).toEqual({
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12
  })
})

test('author with the most blogs', () => {
  const obj = {}
  for (let blog of listHelper.blogList) {
    Object.prototype.hasOwnProperty.call(obj, blog.author)
      ? (obj[blog.author] += 1)
      : (obj[blog.author] = 1)
  }

  const most_blog = Object.entries(obj).sort((x, y) => y[1] - x[1])[0]

  const result = { author: most_blog[0], blogs: most_blog[1] }

  expect(result).toEqual({
    author: 'Robert C. Martin',
    blogs: 3
  })
})

test('author with the most likes', () => {
  const authors = {}
  listHelper.blogList.forEach((blog) =>
    Object.prototype.hasOwnProperty.call(authors, blog.author)
      ? (authors[blog.author] += blog.likes)
      : (authors[blog.author] = blog.likes)
  )

  const mostLikes = Object.entries(authors).sort((a, b) => a[1] - b[1])[
    Object.entries(authors).length - 1
  ]
  const result = { author: mostLikes[0], likes: mostLikes[1] }

  expect(result).toEqual({
    author: 'Edsger W. Dijkstra',
    likes: 17
  })
})
