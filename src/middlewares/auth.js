const { verify } = require('jsonwebtoken');
const { verifyJwt } = require('../config/jwt');
const User = require('../api/models/users');

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const parsedToken = token.replace('Bearer ', '');

    // const verified = verifyJwt(parsedToken);

    const { id } = verifyJwt(parsedToken);
    const user = await User.findById(id);

    user.password = null;
    req.user = user;
    next();
  } catch (error) {
    return res.status(404).json('No estás autorizado');
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const parsedToken = token.replace('Bearer ', '');

    // const verified = verifyJwt(parsedToken);

    const { id } = verifyJwt(parsedToken);
    const user = await User.findById(id);

    if (user.roles === 'admin') {
      user.password = null;
      req.user = user;
      next();
    } else {
      return res
        .status(400)
        .json('Esta acción sólo la pueden realizar los administradores');
    }
  } catch (error) {
    return res.status(404).json('No estás autorizado');
  }
};

module.exports = { isAuth, isAdmin };
