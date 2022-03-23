const { Op } = require('sequelize'); // https://sequelize.org/v5/manual/querying.html
const { BlogPost, Category } = require('../models');
const { postSchema } = require('../../utils/Schemas/schemas');
const handlingError = require("../../utils/Helpers/handlingError");
const { BadRequest } = require('../../utils/Helpers/status-http-library');

const create = async ({ title, content, categoryIds, userId }) => {
  try {
    await postSchema.validate({ title, content, categoryIds })
  } catch (error) {
    if (error) { throw handlingError(BadRequest, error.errors[0]); }
  }

  // verifica se as categorias informadas existem no db
  const existingCategories = await Category.findAll({
    where: { id: { [Op.in]: categoryIds } },
  });

  if (existingCategories.length !== categoryIds.length) {
    throw handlingError(BadRequest, '"categoryIds" not found');
  }

  const response = await BlogPost.create({ title, content, categoryIds, userId });
  return response.dataValues;
};

module.exports = {
  create,
}