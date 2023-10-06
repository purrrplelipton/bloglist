import { token } from "./auth";

const resourceUrl = "/api/users";

const usersApi = {
  get: async () => {
    try {
      const response = await fetch(resourceUrl, {
        headers: { Authorization: token },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in GET request:", error);
      throw error;
    }
  },
  post: async (payload) => {
    try {
      const response = await fetch(resourceUrl, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          redirect: "follow",
          referrerPolicy: "no-referrer",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in POST request:", error);
      throw error;
    }
  },
  patch: async (id, payload) => {
    try {
      const response = await fetch(`${baseurl}/${id}`, {
        method: "PATCH",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in PATCH request:", error);
      throw error;
    }
  },
  put: async (id, payload) => {
    try {
      const response = await fetch(`${resourceUrl}/${id}`, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          redirect: "follow",
          referrerPolicy: "no-referrer",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in PUT request:", error);
      throw error;
    }
  },
  delete: async (id, token) => {
    try {
      const response = await fetch(`${resourceUrl}/${id}`, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          Authorization: token,
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in DELETE request:", error);
      throw error;
    }
  },
};

export default usersApi;
