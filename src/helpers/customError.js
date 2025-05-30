class AppError extends Error
{
	constructor(message, statusCode){
		super(message);
		this.name = this.constructor.name;
		this.statusCode = statusCode || 500;
		
		Error.captureStackTrace(this, this.constructor);
	}
}

class UnauthorizeError extends AppError
{
	constructor(message = "Unauthorized"){
		super(message, 401);
	}
}

class ForbiddenError extends AppError
{
	constructor(message = "Forbidden Access"){
		super(message, 403);
	}
}

class NotFoundError extends AppError
{
	constructor(message = "Resource not found"){
		super(message, 404);
	}
}

function errorHandler(err, res) {
	console.error(err);

	const { statusCode = 500, message = "Internal Server Error" } = err;

	res.status(statusCode).json({
		message,
	});
}

module.exports = { AppError, UnauthorizeError, ForbiddenError, NotFoundError, errorHandler };
