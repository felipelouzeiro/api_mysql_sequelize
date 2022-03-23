const { Created, OK } = require("../../utils/Helpers/status-http-library");
const categoryService = require("../services/categories")

const createCategory = async (req, res, next) => {
  try {
    const data = req.body;

    const response = await categoryService.createCategory(data);

    res.status(Created).json(response);
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
    try {
    const categories = await categoryService.getCategories();
  
    return res.status(OK).json(categories);
  } catch (err) {
    next(err);
  }
 };

module.exports = {
  createCategory,
  getCategories,
}