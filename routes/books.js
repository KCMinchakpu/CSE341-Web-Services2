const express = require('express');
const router = express();

const booksController = require('../controllers/books');

//Read (Get) records from database
router.get('/', booksController.getAllBooksdetails);
router.get('/:id', booksController.getSingleBookdetails);



module.exports = router;