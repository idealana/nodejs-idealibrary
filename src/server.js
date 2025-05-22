const express = require('express');

/** Routes */
const bookRoute = require('./routes/book');

const app = express();

app.use(express.json());

/** Book Route */
app.use('/api/book', bookRoute);

app.use((req, res, next) => {
	res.status(404).json({
		message: 'Resource not found',
	});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Application running on port ${PORT}`);
});
