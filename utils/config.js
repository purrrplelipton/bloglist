require("dotenv").config();

const PORT = process.env.PORT,
  URI = process.env.URI;

module.exports = { PORT, URI };
