/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const httpError = require('http-errors');
const jwt = require('jsonwebtoken');
const store = require('store');
const prisma = require('../../prisma/index');

module.exports.doLogin = async (event) => {
  const body = JSON.parse(event.body);
  const { email, password } = body;
  try {
    const login = await prisma.user.findFirst({
      where: { email },
    });

    const hash = bcrypt.hashSync(password, login.password);

    if (hash === login.password) {
      const accessToken = jwt.sign(
        { login: login.id },
        process.env.SECRET,
        { expiresIn: 86400 },
      );

      login.password = undefined;

      store.set('user', login);
      const us = store.get('user');
      console.log(us);
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            login,
            accessToken,
          },
        ),
      };
    }
    const error = httpError.Forbidden('error to get a valid login');
    return error.message;
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          error,
        },
      ),
    };
  }
};
