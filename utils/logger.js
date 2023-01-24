function info(...args) {
  return process.env.NODE_ENV === "test" ? null : console.log(...args);
}

function error(...args) {
  return process.env.NODE_ENV === "test" ? null : console.error(...args);
}

module.exports = { info, error };
