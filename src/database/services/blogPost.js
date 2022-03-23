const { BlogPost } = require('../models');
const { postSchema } = require('../../utils/Schemas/schemas');
const handlingError = require("../../utils/Helpers/handlingError");
const { BadRequest } = require('../../utils/Helpers/status-http-library');

const create = async ({ title, content, categoryIds, userId }) => {
  try {
    await postSchema.validate({ title, content, categoryIds })
  } catch (error) {
    if (error) { throw handlingError(BadRequest, error.errors[0]); }
  }

  const response = await BlogPost.create({ title, content, categoryIds, userId });
  return response.dataValues;
};

module.exports = {
  create,
}