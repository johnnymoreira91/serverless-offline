/* eslint-disable no-unused-vars */
const httpError = require('http-errors');
const bcrypt = require('bcrypt');
const prisma = require('../../prisma/index');

module.exports.createUser = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const body = JSON.parse(event.body);

  const email = await prisma.user.findFirst({
    where: { email: body.email },
  });

  if (email != null) {
    const err = httpError.Conflict('Email already exist');
    return {
      body: JSON.stringify(err.message),
    };
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(body.password, salt);

  const findPermission = await prisma.permission.findFirst({
    where: { permissionName: body.permission },
  });

  if (findPermission == null) {
    const err = httpError.BadRequest('Permission doenst exist');
    return {
      body: JSON.stringify(err.message),
    };
  }

  const user = await prisma.user.create({
    data: {
      name: body.name,
      superUser: body.superUser,
      email: body.email,
      password: hash,
      Permission: {
        connect: {
          id: findPermission.id,
        },
      },
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
