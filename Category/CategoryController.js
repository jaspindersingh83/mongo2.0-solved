let Category = require("./CategoryModel");

const getCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(202).json({ category });
  } catch (error) {
    res.status(202).json({ error });
  }
};

const createCategory = async (req, res) => {
  const CategoryInfo = req.body;
  try {
    const category = await Category.create(CategoryInfo);
    res.status(202).json({ category });
  } catch (error) {
    res.status(202).json({ error });
  }
};

module.exports = { createCategory, getCategory };
