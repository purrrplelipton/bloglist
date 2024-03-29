import { token } from "./auth"

const resourceUrl = "/api/blogs"

const blogsApi = {
  get: async (id = "", payload) => {
    const url = `${resourceUrl}/${id}`
    let query
    if (payload) {
      query = `?q=${encodeURIComponent(payload)}`
    }
    try {
      const response = await fetch(`${url}${payload ? query : ""}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error in GET request:", error)
      throw error
    }
  },
  post: async (payload) => {
    try {
      const response = await fetch(resourceUrl, {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: payload,
      })
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error in POST request:", error)
      throw error
    }
  },
  patch: async (id, payload) => {
    try {
      const response = await fetch(`${resourceUrl}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error in PATCH request:", error)
      throw error
    }
  },
  put: async (id, payload) => {
    try {
      const response = await fetch(`${resourceUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error("Error in PUT request:", error)
      throw error
    }
  },
  delete: async (id) => {
    try {
      const response = await fetch(`${resourceUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      })
      if (!response.ok) {
        throw new Error(response.statusText)
      }
    } catch (error) {
      console.error("Error in DELETE request:", error)
      throw error
    }
  },
}

export default blogsApi
