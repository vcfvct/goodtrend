import { Request, Response, NextFunction } from 'express';
const bodyParser = require('body-parser');

module.exports = (request: Request, response: Response, next: NextFunction) => {
	bodyParser.json({inflate: false})(request, response, next);
};