
module.exports.home = async (event) => {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Home Page, Chosse What to do',
          //input: event,
        },
        null,
        2
      ),
    };
};