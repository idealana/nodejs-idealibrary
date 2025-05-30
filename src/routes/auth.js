const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/** Repositories */
const UserRepository = require('../repositories/user');

/** Helpers */
const { errorHandler, UnauthorizeError } = require('../helpers/customError');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await UserRepository.findByEmail(email);

		if(!user || !(await bcrypt.compare(password, user.password))) {
			throw new UnauthorizeError("Invalid email or password");
		}

		const token = jwt.sign(
			{
				userId: user.id,
			},
			JWT_SECRET,
			{ expiresIn: '1h' }
		);

		res.json({
			message: "Login Successful",
			token,
		});
	} catch(err) {
		errorHandler(err, res);
	}
});

module.exports = router;
