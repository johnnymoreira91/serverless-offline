const routes = require('../utils/routes.json');

module.exports.home = async () => ({
  statusCode: 200,
  body: JSON.stringify(
    {
      routes,
    },
    null,
    2,
  ),
});
