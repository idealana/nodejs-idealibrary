const BaseRepository = require('./Base');

class BookCategoryRepository extends BaseRepository {
	constructor() {
		super('bookCategory');

		this._isSoftDeletes = true;
	}
}

module.exports = new BookCategoryRepository();
