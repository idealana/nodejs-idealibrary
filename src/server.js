const express = require('express');

/** Routes */
const bookRoute = require('./routes/book');

const app = express();

app.use(express.json());

/** Book Route */
app.use('/api/book', bookRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Application running on port ${PORT}`);
});
