class AppError extends Error
{
	constructor(message, statusCode){
		super(message);
		this.name = this.constructor.name;
		this.statusCode = statusCode || 500;
		
		Error.captureStackTrace(this, this.constructor);
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

module.exports = { AppError, NotFoundError, errorHandler };
