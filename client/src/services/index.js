/* eslint-disable indent */
import axios from "axios";

let token = null;

export function setToken(authToken) {
  token = `Bearer ${authToken}`;
}

const services = {
  user: {
    api: axios.create({ baseURL: "/api/users" }),
    get: async function () {
      const { data } = await this.api.get("", {
        headers: { Authorization: token },
      });
      return data;
    },
    post: async function (details) {
      const { data } = await this.api.post("", details);
      return data;
    },
    patch: async function (update) {
      const { data } = await this.api.patch("", update, {
        headers: { Authorization: token },
      });
      return data;
    },
    delete: async function (id) {
      const { data } = await this.api.delete(`/${id}`, {
        headers: { Authorization: token },
      });
      return data;
    },
  },
  verify: async function (credentials) {
    const { data } = await axios.post("/api/sign-in", credentials);
    localStorage.setItem("bloggerzon", JSON.stringify(data));
    const { id, token } = data;
    setToken(token);
    return id;
  },
  isAuthorized: () => Boolean(localStorage.getItem("bloggerzon")),
  blog: {
    api: axios.create({ baseURL: "/api/blogs" }),
    get: async function (requestType, idOrQuery) {
      let endpoint = "";

      switch (requestType) {
        case "all":
          endpoint = "";
          break;
        case "search":
          endpoint = "";
          break;
        case "specific":
          if (!idOrQuery)
            throw new Error("ID needed for 'specific' request type");
          endpoint = `/${idOrQuery}`;
          break;
        default:
          throw new Error("Invalid request type.");
      }

      const { data } = await this.api.get(endpoint, {
        params: requestType === "search" ? { search: idOrQuery } : undefined,
        headers: { Authorization: token },
      });

      return data;
    },
    post: async function (blog) {
      const { data } = await this.api.post("", blog, {
        headers: { Authorization: token },
      });
      return data;
    },
    patch: async function (id, update) {
      const { data } = await this.api.patch(`/${id}`, update, {
        headers: { Authorization: token },
      });
      return data;
    },
    delete: async function (id) {
      const { data } = await this.api.delete(`/${id}`, {
        headers: { Authorization: token },
      });
      return data;
    },
  },
};

export default services;
