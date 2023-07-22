import axios from "axios";

const api = axios.create({
  baseURL: "/api/blogs",
});

export async function getBlogs() {
  const { data } = await api.get("/");
  return data;
}

export async function getBlog(id) {
  const { data } = await api.get(`/${id}`);
  return data;
}

export async function addBlog(blog) {
  const bloglist = localStorage.getItem("bloglist");
  if (bloglist) {
    const { token } = JSON.parse(bloglist);
    const { data } = await api.post("/", blog, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
}

export async function updateBlog(id, payload) {
  const bloggerzon = localStorage.getItem("bloglist");

  if (bloggerzon) {
    const { token } = JSON.parse(bloggerzon);
    const { data } = await api.patch(`/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
}

export async function deleteBlog(id) {
  const { data } = await api.delete(`/${id}`);
  return data;
}
