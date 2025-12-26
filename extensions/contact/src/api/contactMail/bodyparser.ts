const bodyParser = require('body-parser');

module.exports = (request, response, next) => {
	bodyParser.json({inflate: false})(request, response, next);
};