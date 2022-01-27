/* eslint-disable no-unused-vars */
const prisma = require('../../prisma/index');

module.exports.getUser = async (event) => {
  const user = await prisma.user.findMany();

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        user,
      },
    ),
  };
};
