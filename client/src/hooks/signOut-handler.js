export default function signOutHandler() {
  const dgtoken = localStorage.getItem("dgtoken");
  if (dgtoken) {
    localStorage.removeItem("dgtoken");
  }
}
