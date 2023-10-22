export let token = null

export function settoken(payload) {
  token = `Bearer ${payload}`
}

export async function verify(payload) {
  try {
    const response = await fetch("/api/sign-in", {
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
    })
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const data = await response.json()
    localStorage.setItem("dgtoken", JSON.stringify(data))
    const { id, token } = data
    settoken(token)
    return id
  } catch (error) {
    console.error("Error in POST request:", error)
    throw error
  }
}

export function authorized() {
  return Boolean(localStorage.getItem("dgtoken"))
}
