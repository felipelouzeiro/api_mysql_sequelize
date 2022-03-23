const { Created } = require("../../utils/Helpers/status-http-library");
const blogPostService = require("../services/blogPost");

const createBlogPost = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id: userId } = req.user;
    const response = await blogPostService.create({ title, content, categoryIds, userId });

    res.status(Created).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBlogPost,
}