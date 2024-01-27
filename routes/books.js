const express = require('express');
const router = express();

const booksController = require('../controllers/books');

//Read (Get) All Books Details from the database
router.get('/', booksController.getAllBooksdetails);
// Read (GET) a single Book Details from the database
router.get('/:id', booksController.getSingleBookdetails);
//Create (POST) a new Book Details
router.post('/', booksController.createBookdetails);
//Update (PUT) a Book Details
router.put('/:id', booksController.updateBookdetails);
//Delete (DELETE) a Book Details
router.delete('/:id', booksController.deleteBookdetails);


module.exports = router;