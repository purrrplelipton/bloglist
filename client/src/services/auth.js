import axios from "axios";

const api = axios.create({ baseURL: "/api/sign-in" });

export async function signIn(credentials) {
  const { data } = await api.post("/", credentials);
  return data;
}

export function isAllowed() {
  return localStorage.getItem("bloggerzon") !== null;
}

export async function signOut() {
  localStorage.removeItem("bloggerzon");
}
