export default function signOutHandler() {
  const dgtoken = localStorage.getItem("dgtoken")
  if (dgtoken) {
    return localStorage.removeItem("dgtoken")
  }
  return
}
