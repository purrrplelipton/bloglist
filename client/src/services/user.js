import axios from "axios";

const api = axios.create({ baseURL: "/api/users" });

export async function getUser() {
  const bloggerzonKey = localStorage.getItem("bloggerzon");
  if (bloggerzonKey) {
    const { token } = JSON.parse(bloggerzonKey);
    const { data } = await api.get("/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
}

export async function createUser(user) {
  const { data } = await api.post("/", user);
  return data;
}

export async function updateUser(field) {
  const bloggerzonKey = localStorage.getItem("bloggerzon");
  if (bloggerzonKey) {
    const { token } = JSON.parse(bloggerzonKey);
    const { data } = await api.patch("/", field, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
}

export async function deleteUser(id) {
  const { data } = await api.delete(`/${id}`);
  return data;
}
