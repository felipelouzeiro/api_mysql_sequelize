const { Op } = require('sequelize'); // https://sequelize.org/v5/manual/querying.html
const { BlogPost, Category, User } = require('../models');
const { postSchema } = require('../../utils/Schemas/schemas');
const handlingError = require("../../utils/Helpers/handlingError");
const { BadRequest, Unauthorized, NotFound } = require('../../utils/Helpers/status-http-library');

const createBlogPost = async ({ title, content, categoryIds, userId }) => {
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

const getBlogPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

const deleteBlogPost = async (id, userId) => {
  const existingPost = await BlogPost.findByPk(id);
  
  if (!existingPost) { throw handlingError(NotFound, 'Post does not exist'); }

  if (existingPost.dataValues.userId !== userId) { 
    throw handlingError(Unauthorized, 'Unauthorized user'); 
}

  await BlogPost.destroy({
    where: { id } });
};

const getBlogPostById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) { throw handlingError(NotFound, 'Post does not exist'); }

  return post;
};


module.exports = {
  createBlogPost,
  getBlogPosts,
  deleteBlogPost,
  getBlogPostById,
}