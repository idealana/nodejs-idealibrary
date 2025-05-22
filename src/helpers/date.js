const DateHelper = {
	now(){
		const date = new Date();

		return date.toISOString();
	},
};

module.exports = DateHelper;
