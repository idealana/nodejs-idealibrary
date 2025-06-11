const prisma = require('../configs/database');

class BaseRepository {

	#isWithTrashed = false;
	
	/**
	 * @param string modelName
	 */
	constructor(modelName) {
		this._modelName = modelName;
		this._isSoftDeletes = false;
		this._options = {};
	}

	/**
	 * Set With Trashed
	 * @param boolean value
	 * @return class
	 */
	withTrashed(value = true) {
		this.#isWithTrashed = value;
		return this;
	}

	/**
	 * Is Soft Deletes and With Trashed
	 * @return boolean
	 */
	isWithTrashed() {
		return (this._isSoftDeletes && this.#isWithTrashed);
	}

	/**
	 * Get All Data
	 * @param object where
	 * @return array objects
	 */
	async getAll(where = {}) {
		if(!this.isWithTrashed()) {
			where.deletedAt = null;
		}

		const options = this._options;

		// reset
		this._options = {};
		this.withTrashed(false); // reset

		return await prisma[this._modelName].findMany({
			where,
			...options,
		});
	}

	/**
	 * Find Data
	 * @param object where
	 * @return object
	 */
	async findBy(where) {
		if(!this.isWithTrashed()) {
			where.deletedAt = null;
		}

		this.withTrashed(false); // reset

		return await prisma[this._modelName].findUnique({
			where,
		});
	}

	/**
	 * Find Data by id
	 * @param int id
	 * @return object
	 */
	async findById(id) {
		return await this.findBy({ id });
	}

	/**
	 * Insert Data
	 * @param object data
	 * @return object
	 */
	async insert(data){
		return await prisma[this._modelName].create({ data });
	}

	/**
	 * Update Data
	 * @param object where
	 * @param object data
	 * @return object
	 */
	async updateBy(where, data){
		return await prisma[this._modelName].update({
			where,
			data,
		});
	}

	/**
	 * Update Data by id
	 * @param int id
	 * @param object data
	 * @return object
	 */
	async updateById(id, data){
		return await this.updateBy({ id }, data);
	}

	/**
	 * Hard or Soft Delete Data
	 * @param object where
	 * @param boolean isForceDelete
	 * @return mix object|boolean
	 */
	async delete(where, isForceDelete = false) {
		if(this._isSoftDeletes && !isForceDelete) {
			return await this.updateBy(where, { deletedAt: new Date() });
		}

		return await prisma[this._modelName].delete({ where });
	}

	/**
	 * Delete Data by id
	 * @param int id
	 * @param boolean isForceDelete
	 * @return mix object|boolean
	 */
	async deleteById(id, isForceDelete = false) {
		return await this.delete({ id }, isForceDelete);
	}

	/**
	 * Set Relation Model
	 * @param array relations
	 * @return class
	 */
	includes(relations) {
		const include = {};

		for(const relation of relations) {
			const splitRelation = relation.split('.');
			let current = include;

			for (let index = 0; index < splitRelation.length; index++) {
				const partRelation = splitRelation[index];

				if(!current[ partRelation ]) {
					current[ partRelation ] = {
						include: {},
					};
				}

				// if last iteration
				if(!splitRelation[index + 1]) {
					current[ partRelation ] = true;
					current = current[ partRelation ];
					continue;
				}

				current = current[ partRelation ]['include'];
			} // endfor
		} // endfor

		Object.assign(this._options, { include });

		return this;
	}
}

module.exports = BaseRepository;
