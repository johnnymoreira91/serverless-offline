/* eslint-disable no-unused-vars */
const store = require('store');
const prisma = require('../../prisma/index');

module.exports.getUser = async (event) => {
  const user = await prisma.user.findMany();

  const userStore = await store.get('user');

  const permission = await prisma.permission.findFirst({
    where: { permissionName: userStore.permission },
  });

  if (permission.permissionName === 'USER' || userStore.superUser === true) {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          user,
        },
      ),
    };
  }
  return {
    statusCode: 400,
    body: JSON.stringify(
      {
        msg: 'You doenst have permission to do this',
      },
    ),
  };
};
