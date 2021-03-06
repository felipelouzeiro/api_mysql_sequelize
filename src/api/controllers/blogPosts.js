const { Created, NoContent, OK } = require("../../utils/Helpers/status-http-library");
const blogPostService = require("../services/blogPost");

const createBlogPost = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id: userId } = req.user;
    const response = await blogPostService.createBlogPost({ title, content, categoryIds, userId });

    res.status(Created).json(response);
  } catch (error) {
    next(error);
  }
};

const getBlogPosts = async (req, res, next) => {
  try {
    const posts = await blogPostService.getBlogPosts();

    return res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

const deleteBlogPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { id: userId } = req.user;

    await blogPostService.deleteBlogPost(id, userId);

    res.status(NoContent).end();
  } catch (error) {
    next(error);
  }
};

const getBlogPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await blogPostService.getBlogPostById(id);

    res.status(OK).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBlogPost,
  getBlogPosts,
  deleteBlogPost,
  getBlogPostById,
}