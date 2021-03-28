const versionOfPackage = require('../package.json')
module.exports.version = async (event) => {
    const versionOf = versionOfPackage
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          version : versionOfPackage.version
        }
      ),
    };
};