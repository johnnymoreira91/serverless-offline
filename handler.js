// const { create, jsonMiddleware } = require('slspress');

// const handler = create();

// handler.on('handle')
//     .middleware(jsonMiddleware)
//     .get('/', (req, res) => {
//         return res.ok('hello-world');
//     });

// module.exports = handler.export();

module.exports.hello = async (event) => ({
  statusCode: 200,
  body: JSON.stringify(
    {
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    },
    null,
    2,
  ),
});
