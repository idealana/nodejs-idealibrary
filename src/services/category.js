/** Repositories */
const CategoryRepository = require('../repositories/Category');

/** Helpers */
const { NotFoundError } = require('../helpers/customError');

const CategoryService = {
	/**
	 * Get All Data
	 * @return array objects
	 */
	async getAll() {
		const categories = await CategoryRepository.getAll();

		if(!categories) {
			throw new NotFoundError(`Category Data not found`);
		}

		return categories;
	},

	/**
	 * Find Category by id
	 * @param int id
	 * @return object
	 */
	async findById(id){
		const category = await CategoryRepository.findById(parseInt(id));

		if(!category) {
			throw new NotFoundError("Category not found");
		}

		return category;
	},

	/**
	 * Insert Category
	 * @param object data
	 * @return object
	 */
	async insert(data){
		const category = await CategoryRepository.insert({
			name: data.name,
			createdBy: data.userId,
		});

		return category;
	},

	/**
	 * Update Category by id
	 * @param int id
	 * @param object data
	 * @return object
	 */
	async update(id, data){
		const findCategory = await CategoryRepository.findById(parseInt(id));

		if(!findCategory) {
			throw new NotFoundError("Category not found");
		}

		const category = await CategoryRepository.updateById(id, {
			name: data.name,
			updatedBy: data.userId,
			updatedAt: new Date(),
		});

		return category;
	},

	/**
	 * Delete Category by id
	 * @param int id
	 * @return object
	 */
	async delete(id){
		return await CategoryRepository.deleteById(parseInt(id));
	},
};

module.exports = CategoryService;
