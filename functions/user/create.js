/* eslint-disable no-unused-vars */
const httpError = require('http-errors');
const prisma = require('../../prisma/index');

module.exports.createUser = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const body = JSON.parse(event.body);
  console.log(body);

  // let email = await prisma.login.findFirst({
  //   where: { email: body.email },
  // });

  // if (email == null) {
  //   return httpError.BadRequest('User/Email already existe');
  // }

  // await prisma.login.create({
  //   data: {
  //     email: body.email,
  //     password: body.password,
  //   },
  // });

  // email = await prisma.login.findFirst({
  //   where: { email: body.email },
  // });

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
