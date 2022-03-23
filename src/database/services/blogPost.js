const { Op } = require('sequelize'); // https://sequelize.org/v5/manual/querying.html
const { BlogPost, Category, User } = require('../models');
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
  console.log("🚀 ~ file: blogPost.js ~ line 17 ~ create ~ categoryIds", categoryIds)
  const existingCategories = await Category.findAll({
    where: { id: { [Op.in]: categoryIds } },
  });
  console.log("🚀 ~ file: blogPost.js ~ line 18 ~ create ~ existingCategories", existingCategories)

  if (existingCategories.length !== categoryIds.length) {
    throw handlingError(BadRequest, '"categoryIds" not found');
  }

  const response = await BlogPost.create({ title, content, categoryIds, userId });
  return response.dataValues;
};

const getBlogPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

    console.log('posts: ', posts);
  return posts;
};

module.exports = {
  create,
  getBlogPosts,
}