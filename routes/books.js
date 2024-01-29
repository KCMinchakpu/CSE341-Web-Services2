const express = require('express');
const router = express();

const booksController = require('../controllers/books');
const validation = require('../middleware/validate');

//Read (Get) records from database
router.get('/', booksController.getAllBooksdetails);
router.get('/:id', booksController.getSingleBookdetails);
//Create (POST) a new Book Details
router.post('/', validation.saveBookdetails, booksController.createBookdetails);
//Update (PUT) a Book Details
router.put('/:id', validation.saveBookdetails, booksController.updateBookdetails);
//Delete (DELETE) a Book Details
router.delete('/:id', booksController.deleteBookdetails);

module.exports = router;