const prisma = require('../configs/database.js');

const UserRepository = {
	/**
	 * Find User by email
	 * @param string email
	 * @return object
	 */
	async findByEmail(email) {
		const user = await prisma.user.findUnique({ where: { email } });

		return user;
	},
}

module.exports = UserRepository;
