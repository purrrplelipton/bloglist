import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000/api/users" });

export async function getUsers() {
  const { data } = await api.get("");
  return data;
}

export async function getUser(id) {
  const { data } = await api.get(`/${id}`);
  return data;
}

export async function createUser(user) {
  const { data } = await api.post("", user);
  return data;
}

export async function updateUser(id, field) {
  const { data } = await api.put(`/${id}`, field);
  return data;
}

export async function deleteUser(id) {
  const { data } = await api.delete(`/${id}`);
  return data;
}
