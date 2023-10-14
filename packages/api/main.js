import { createServer } from "http";
import app from "./app.js";
import { PORT } from "./utils/config.js";

createServer(app).listen(PORT, () =>
  console.log("server running on port", PORT)
);
