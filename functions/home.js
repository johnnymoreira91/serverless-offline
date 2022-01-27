const routes = require('../utils/routes.json');

module.exports.home = async () => {
  const stage = process.env.APP_STAGE;

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        stage,
        routes,
      },
    ),
  };
};
