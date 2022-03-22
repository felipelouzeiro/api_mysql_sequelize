const { InternalError } = require("../../utils/Helpers/status-http-library");

module.exports = (err, _req, res, _next) => {
  // console.log(err);
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(InternalError).json(err);
};