import axios from "axios";

const api = axios.create({ baseURL: "/api/users" });

export async function getUser() {
  const bloglist = localStorage.getItem("bloglist");
  if (bloglist) {
    const { token } = JSON.parse(bloglist);
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
  const bloglist = localStorage.getItem("bloglist");
  if (bloglist) {
    const { token } = JSON.parse(bloglist);
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
