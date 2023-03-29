const jwt = require('jsonwebtoken');

const createToken = (user) => {
  const { email, role } = user;
  const token = jwt.sign(
    {
        email,
        role,
    },
    'secret_key',
    {
      expiresIn: '12h',
    },
  );

  return token;
};

module.exports = { createToken };