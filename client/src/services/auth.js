import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000/api/sign-in" });

export async function signIn(credentials) {
  const { data } = await api.post("/", credentials);
  return data;
}

export function isAllowed() {
  return localStorage.getItem("bloglist") !== null;
}

export async function signOut() {
  localStorage.removeItem("bloglist");
}
