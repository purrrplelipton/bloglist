const app = require("./app");
const { createServer } = require("http");
const { PORT } = require("./utils/config");
const { info } = require("./utils/logger");

createServer(app).listen(PORT, () => info("server running on port:", PORT));
