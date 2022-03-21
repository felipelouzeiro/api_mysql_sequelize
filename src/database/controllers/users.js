const { genToken } = require('../../utils/JWT');
const createUser = require('../../service/Users/createUser');
const { Created } = require('../../utils/status-http-library');

module.exports = async (req, res, next) => {
  try {
    const { displayName, email, password } = req.body;

    const response = await createUser({ displayName, email, password });

    const { password: pass, ...withoutPassword } = response; // removo o password antes de retornar as infomações;

    const codeToken = await genToken(withoutPassword);

    res.status(Created).json({ token: codeToken });
  } catch (error) {
    next(error);
  }
};