/** Repositories */
const BookCategoryRepository = require('../repositories/BookCategory');

/** Helpers */
const { NotFoundError } = require('../helpers/customError');

const BookCategoryService = {
	/**
	 * Get Book Category by bookId
	 * @param int bookId
	 * @return array
	 */
	async getByBookId(bookId){
		const data = await BookCategoryRepository
			.includes(['category'])
			.getAll({
				bookId,
			});

		return data;
	},

	/**
	 * Insert Book Category
	 * @param object data
	 * @return object
	 */
	async insert(data){
		const bookCategory = await BookCategoryRepository.insert({
			bookId: parseInt(data.bookId),
			categoryId: parseInt(data.categoryId),
			createdBy: data.userId,
		});

		return bookCategory;
	},

	/**
	 * Delete Book Category by id
	 * @param int bookId
	 * @param int bookCategoryId
	 * @return object
	 */
	async delete(bookId, bookCategoryId){
		const find = await BookCategoryRepository.findBy({
			id: bookCategoryId,
			bookId,
		});

		if(!find) {
			throw new NotFoundError("Book Category not found");
		}

		return await BookCategoryRepository.deleteById(bookCategoryId);
	},
};

module.exports = BookCategoryService;
