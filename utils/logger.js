function info(...args) {
  return console.log(...args);
}

function error(...args) {
  return console.error(...args);
}

module.exports = { info, error };
