const express = require('express');

/** Routes */
const authRoute = require('./routes/auth');
const bookRoute = require('./routes/book');

/** Middlewares */
const AuthMiddleware = require('./middlewares/auth');

const app = express();

app.use(express.json());

/** Auth Route */
app.use('/auth', authRoute);

/** Book Route */
app.use('/api/book', AuthMiddleware.authenticateToken, bookRoute);

/** Category Route */
app.use('/api/category', AuthMiddleware.authenticateToken, require('./routes/category'));

app.use((req, res, next) => {
	res.status(404).json({
		message: 'Resource not found',
	});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Application running on port ${PORT}`);
});
