const { genToken } = require('../../utils/JWT');
const createUser = require('../../service/Users/createUser');

module.exports = async (req, res, next) => {
  try {
    const { displayName, email, password } = req.body;

    const response = await createUser( displayName, email, password );

    const { password: pass, ...withoutPassword } = response; // removo o password antes de retornar as infomações;

    const codeToken = await genToken(withoutPassword);

    res.status(201).json({ token: codeToken });
  } catch (error) {
    next(error);
  }
};