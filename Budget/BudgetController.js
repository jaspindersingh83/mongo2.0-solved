const Budget = require("./BudgetModel");
const Expense = require("../Expense/ExpenseModel");

const getBudgetSummary = async (req, res) => {
  const { id } = req.params;
  try {
    const { budgetAmount } = await Budget.findById(id);
    console.log(budgetAmount);
    const queryExpense = await Expense.aggregate([
      {
        $group: { _id: 1, totalExpense: { $sum: "$amount" } },
      },
    ]);
    res.status(200).json({ diff: budgetAmount - queryExpense[0].totalExpense });
  } catch (error) {
    console.log(error);
    res.status(202).json({ error });
  }
};
const createBudget = async (req, res) => {
  const budgetInfo = req.body;
  try {
    const budget = await Budget.create(budgetInfo);
    res.status(202).json({ budget });
  } catch (error) {
    res.status(202).json({ error });
  }
};

module.exports = { createBudget, getBudgetSummary };
