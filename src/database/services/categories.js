const { Category } = require('../models');
const handlingError = require('../../utils/Helpers/handlingError');
const { BadRequest } = require('../../utils/Helpers/status-http-library');
const { categorySchema } = require('../../utils/Schemas/schemas');

const createCategory = async ({ name }) => {
  try {
    await categorySchema.validate({ name })
  } catch (error) {
    if (error) { throw handlingError(BadRequest, error.errors[0]); }
  }

  const response = await Category.create({ name });
  return response.dataValues;
};

const getCategories = async () => {
  const categories = await Category.findAll();
  
  return categories;
};

module.exports = {
  createCategory,
  getCategories,
}