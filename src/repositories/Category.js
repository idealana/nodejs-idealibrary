const BaseRepository = require('./Base');

class CategoryRepository extends BaseRepository {
	constructor() {
		super('category');

		this._isSoftDeletes = true;
	}
}

module.exports = new CategoryRepository();
