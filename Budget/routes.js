const { createBudget, getBudgetSummary } = require("./BudgetController");

module.exports = (server) => {
  server.post("/budget", createBudget);
  server.get("/budget/:id/summary", getBudgetSummary);
};
