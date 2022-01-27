const versionOfPackage = require('../package.json');

module.exports.version = async () => {
  const versionOf = versionOfPackage;
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        version: versionOf.version,
      },
    ),
  };
};
