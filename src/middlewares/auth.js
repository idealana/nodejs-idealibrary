const jwt = require('jsonwebtoken');

/** Helpers */
const { errorHandler, UnauthorizeError, ForbiddenError } = require('../helpers/customError');

const JWT_SECRET = process.env.JWT_SECRET;

const AuthMiddleware = {
	/**
	 * Authenticate Token
	 * @param object req
	 * @param object res
	 * @param callable next
	 * @return void
	 */
	authenticateToken(req, res, next) {
		try {
			const authHeader = req.headers['authorization'];
			const token = authHeader && authHeader.split(' ')[1];

			if(!token) throw new UnauthorizeError("Unauthorized User");

			jwt.verify(token, JWT_SECRET, (err, payload) => {
				if(err) throw new ForbiddenError();

				req.user = payload;
				next();
			});
		} catch(err) {
			errorHandler(err, res);
		}
	},
}

module.exports = AuthMiddleware;
