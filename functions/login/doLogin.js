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
    console.log(login);
    const hash = bcrypt.hashSync(password, login.password);
    console.log(hash, 'hash');
    if (hash === login.password) {
      console.log('entrou no if');
      const accessToken = jwt.sign(
        { login: login.id },
        process.env.SECRET,
        { expiresIn: 86400 },
      );

      console.log(accessToken, 'token');

      // const user = await prisma.user.findFirst({
      //   where: { loginId: Number(login.id) },
      // });

      login.password = undefined;

      store.set('user', login);
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
