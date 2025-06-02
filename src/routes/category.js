const express = require('express');

/** Services */
const CategoryService = require('../services/category');

/** Helpers */
const { errorHandler } = require('../helpers/customError');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const data = await CategoryService.getAll();

		res.json({
			message: 'Success',
			data,
		});
	} catch(err) {
		errorHandler(err, res);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const category = await CategoryService.findById(id);

		res.json({
			message: 'Success',
			category,
		});
	} catch(err) {
		errorHandler(err, res);
	}
});

router.post('/', async (req, res) => {
	try {
		req.body.userId = req.user.userId;

		const data = await CategoryService.insert(req.body);

		res.json({
			message: 'Category Added Successfully',
			data,
		});
	} catch(err) {
		errorHandler(err, res);
	}
});

router.put('/:id', async (req, res) => {
	try {
		req.body.userId = req.user.userId;

		const id = parseInt(req.params.id);
		const data = await CategoryService.update(id, req.body);

		res.json({
			message: 'Category Updated Successfully',
			data,
		});
	} catch(err) {
		errorHandler(err, res);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		await CategoryService.delete(id);

		res.json({
			message: 'Category Deleted Successfully',
		});
	} catch(err) {
		errorHandler(err, res);
	}
});

module.exports = router;
