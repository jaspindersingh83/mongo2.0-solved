const { createCategory, getCategory } = require("./CategoryController");

module.exports = (server) => {
  server.post("/category", createCategory);
  server.get("/category", getCategory);
};
