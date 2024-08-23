const {
  createExpense,
  getExpense,
  getExpenseByCategory,
} = require("./ExpenseController");

module.exports = (server) => {
  server.post("/expense", createExpense);
  server.get("/expense", getExpense);
  server.get("/expensesByCategory", getExpenseByCategory);
};
