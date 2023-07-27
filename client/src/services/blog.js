import axios from "axios";

const api = axios.create({
  baseURL: "/api/blogs",
});

export async function getBlogs(query) {
  const { data } = await api.get("/", { params: { search: query } });
  return data;
}

export async function getBlog(id) {
  const { data } = await api.get(`/${id}`);
  return data;
}

export async function addBlog(blog) {
  const bloggerzonKey = localStorage.getItem("bloggerzon");
  if (bloggerzonKey) {
    const { token } = JSON.parse(bloggerzonKey);
    const { data } = await api.post("/", blog, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
}

export async function updateBlog(id, update) {
  const bloggerzonKey = localStorage.getItem("bloggerzon");

  if (bloggerzonKey) {
    const { token } = JSON.parse(bloggerzonKey);
    const { data } = await api.patch(`/${id}`, update, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
}

export async function deleteBlog(id) {
  const bloggerzonKey = localStorage.getItem("bloggerzon");

  if (bloggerzonKey) {
    const { token } = JSON.parse(bloggerzonKey);
    const { data } = await api.delete(`/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
}
