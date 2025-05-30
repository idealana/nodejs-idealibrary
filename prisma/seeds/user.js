const bcrypt = require('bcryptjs');

const prisma = require('../../src/configs/database.js');
const UserRepository = require('../../src/repositories/user.js');

async function main() {
	const { USER_SEED_EMAIL = '', USER_SEED_PASSWORD = '', USER_SEED_NAME = '' } = process.env;

	if (USER_SEED_EMAIL == '' || USER_SEED_PASSWORD == '' || USER_SEED_NAME = '') {
		console.log("Email, Password and Name is Required");
		return;
	}

	const user = await UserRepository.findByEmail(USER_SEED_EMAIL);

	if(user) {
		console.log("User Already Exists");
		return;
	}

	const password = await bcrypt.hash(USER_SEED_PASSWORD, 10);

	await prisma.user.create({
		data: {
			email: USER_SEED_EMAIL,
			password,
			name: USER_SEED_NAME,
		},
	});

	console.log("User Seed inserted");
}

main()
	.catch((err) => {
		console.error(err);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
