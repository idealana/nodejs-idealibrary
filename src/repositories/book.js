const prisma = require('../configs/database.js');
const DateHelper = require('../helpers/date.js');

const BookRepository = {
	/**
	 * Get All Data
	 * @return array objects
	 */
	async getAll() {
		const books = await prisma.book.findMany();

		return books;
	},

	/**
	 * Find Book by id
	 * @param int id
	 * @return object
	 */
	async findById(id) {
		const book = await prisma.book.findUnique({
			where: {
				id,
			},
		});

		return book;
	},

	/**
	 * Insert Book
	 * @param object data
	 * @return object
	 */
	async insert(data){
		const { title, description, author, createdBy } = data;
		const createdAt = DateHelper.now();

		const book = await prisma.book.create({
			data: { title, description, author, createdBy, createdAt },
		});

		return book;
	},

	/**
	 * Update Book by id
	 * @param int id
	 * @param object data
	 * @return object
	 */
	async update(id, data){
		const { title, description, author, updatedBy } = data;
		const updatedAt = DateHelper.now();

		const book = await prisma.book.update({
			where: {
				id: parseInt(id),
			},
			data: { title, description, author, updatedBy, updatedAt },
		});

		return book;
	},

	/**
	 * Delete Book by id
	 * @param int id
	 * @return object
	 */
	async delete(id){
		await prisma.book.delete({
			where: {
				id,
			},
		});

		return this;
	},
};

module.exports = BookRepository;
