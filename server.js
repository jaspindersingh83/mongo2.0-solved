const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const dbUri = "mongodb://localhost:27017/Budget";
// database
mongoose.Promise = global.Promise;
// Mongo Auth Information
mongoose
  .connect(dbUri)
  .then(() => {
    console.log("Database is connected sucessfully");
  })
  .catch((error) => {
    console.log(error);
  });

// remember to install your npm packages

const server = express();

server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.send("Hello Budgets");
});

const budgetRoutes = require("./Budget/routes");
budgetRoutes(server);

const categoryRoutes = require("./Category/routes");
categoryRoutes(server);

const expenseRoutes = require("./Expense/routes");
expenseRoutes(server);
// add your server code

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
