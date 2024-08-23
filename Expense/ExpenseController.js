let Expense = require("./ExpenseModel");
let Category = require("../Category/CategoryModel");

const getExpense = async (req, res) => {
  try {
    const expense = await Expense.find().populate("categoryId");
    //   .populate("budgetId");
    res.status(202).json({ expense });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getExpenseByCategory = async (req, res) => {
  //we want to see a list of the categories and what you've spent so far.

  try {
    let aggResult = await Expense.aggregate([
      {
        $group: { _id: "$categoryId", amount: { $sum: "$amount" } },
      },
      {
        $sort: { amount: -1 },
      },
    ]);
    await Category.populate(aggResult, {
      path: "_id",
      select: { title: 1, _id: 0 },
    });
    let result = [];
    aggResult.map((re) => {
      result.push({ cat: re._id.title, amount: re.amount });
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const createExpense = async (req, res) => {
  const ExpenseInfo = req.body;
  try {
    const expense = await Expense.create(ExpenseInfo);
    res.status(202).json({ expense });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { createExpense, getExpense, getExpenseByCategory };
