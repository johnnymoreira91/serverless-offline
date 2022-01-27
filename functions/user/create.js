/* eslint-disable no-unused-vars */
const httpError = require('http-errors');
const prisma = require('../../prisma/index');

module.exports.createUser = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const body = JSON.parse(event.body);

  const email = await prisma.user.findFirst({
    where: { email: body.email },
  });

  if (email != null) {
    const err = httpError.Forbidden('Email already exist');
    return {
      body: JSON.stringify(err.message),
    };
  }

  const user = await prisma.user.create({
    data: {
      name: body.name,
      superUser: body.superUser,
      email: body.email,
      password: body.password,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        user,
      },
    ),
  };
};
