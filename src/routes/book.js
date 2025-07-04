const express = require('express');

/** Services */
const BookService = require('../services/book');
const BookCategoryService = require('../services/bookCategory');

/** Helpers */
const { errorHandler } = require('../helpers/customError');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const data = await BookService.getAll();

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
		const book = await BookService.findById(id);

		res.json({
			message: 'Success',
			book,
		});
	} catch(err) {
		errorHandler(err, res);
	}
});

router.get('/:id/category', async (req, res) => {
	try {
		const bookId = parseInt(req.params.id);
		const data = await BookCategoryService.getByBookId(bookId);

		res.json({
			message: 'Success',
			data,
		});
	} catch(err) {
		errorHandler(err, res);
	}
});

router.post('/', async (req, res) => {
	try {
		req.body.createdBy = req.user.userId;

		const data = await BookService.insert(req.body);

		res.json({
			message: 'Book Added Successfully',
			data,
		});
	} catch(err) {
		errorHandler(err, res);
	}
});

router.post('/:id/category', async (req, res) => {
	try {
		req.body.bookId = parseInt(req.params.id);
		req.body.userId = req.user.userId;

		const data = await BookCategoryService.insert(req.body);

		res.json({
			message: 'Book Category Added Successfully',
			data,
		});
	} catch(err) {
		errorHandler(err, res);
	}
});

router.put('/:id', async (req, res) => {
	try {
		req.body.updatedBy = req.user.userId;

		const id = parseInt(req.params.id);
		const data = await BookService.update(id, req.body);

		res.json({
			message: 'Book Updated Successfully',
			data,
		});
	} catch(err) {
		errorHandler(err, res);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		await BookService.delete(id);

		res.json({
			message: 'Book Deleted Successfully',
		});
	} catch(err) {
		errorHandler(err, res);
	}
});

router.delete('/:id/category/:cat_id', async (req, res) => {
	try {
		const bookId = parseInt(req.params.id);
		const categoryId = parseInt(req.params.cat_id);

		await BookCategoryService.delete(bookId, categoryId);

		res.json({
			message: 'Book Category Deleted Successfully',
		});
	} catch(err) {
		errorHandler(err, res);
	}
});

module.exports = router;
