const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');
const config = require('../utils/config');

loginRouter.post('/', async (request, response, next) => {
  const body = request.body;
  try {
    const user = await User.findOne({ username: body.username });
    const passwordCorrect = !user
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password',
      });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, config.JWT_SECRET);

    response
      .status(200)
      .send({ token, username: user.username, name: user.name });
  } catch (err) {
    next(err);
  }
});

module.exports = loginRouter;
