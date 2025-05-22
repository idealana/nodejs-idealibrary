/** Repositories */
const BookRepository = require('../repositories/book');

/** Helpers */
const { NotFoundError } = require('../helpers/customError');


const BookService = {
	/**
	 * Get All Data
	 * @return array objects
	 */
	async getAll() {
		const books = await BookRepository.getAll();

		if(!books) {
			throw new NotFoundError(`Book Data not found`);
		}

		return books;
	},

	/**
	 * Find Book by id
	 * @param int id
	 * @return object
	 */
	async findById(id){
		const book = await BookRepository.findById(id);

		if(!book) {
			throw new NotFoundError("Book not found");
		}

		return book;
	},

	/**
	 * Insert Book
	 * @param object data
	 * @return object
	 */
	async insert(data){
		const book = await BookRepository.insert(data);

		return book;
	},

	/**
	 * Update Book by id
	 * @param int id
	 * @param object data
	 * @return object
	 */
	async update(id, data){
		const findBook = await BookRepository.findById(id);

		if(!findBook) {
			throw new NotFoundError("Book not found");
		}

		const book = await BookRepository.update(id, data);

		return book;
	},

	/**
	 * Delete Book by id
	 * @param int id
	 * @return object
	 */
	async delete(id){
		await BookRepository.delete(id);

		return this;
	},
};

module.exports = BookService;
