// const { create, jsonMiddleware } = require('slspress');

// const handler = create();

// handler.on('handle')
//     .middleware(jsonMiddleware)
//     .get('/', (req, res) => {
//         return res.ok('hello-world');
//     });

// module.exports = handler.export();


'use strict';

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

//   Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
