const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

//Read (GET) all Books Details from the database
const getAllBooksdetails = async (req, res) => {
    // swagger.tags = ['books']
      const result = await mongodb
            .getDatabase()
            .db()
            .collection('books')
            .find();
        result.toArray().then((books) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(books);
        });
    };

//Read (GET) one Book Details (based on Id) from the database
const getSingleBookdetails = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid Book id to find a Book Details.');
  }
        const bookId = new ObjectId(req.params.id);
        const result = await mongodb            
            .getDatabase()
            .db()
            .collection('books')
            .find({ _id: bookId});
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
    });
  };
  
//Create (POST) a new Book Details in the Database
const createBookdetails = async (req, res, next) => {
      //New Book Details
    const newBookdetails = {
        bookISBN: req.body.bookISBN,
        bookTitle: req.body.bookTitle,
        bookDescription: req.body.bookDescription,
        authorName: req.body.authorName,
        releaseDate: req.body.releaseDate,
        publisher: req.body.publisher,
        price: req.body.price
    };
    //Connect to database
    const response = await mongodb
        .getDatabase()
        .db()
        .collection('books')
        .insertOne(newBookdetails);
    if(response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Sorry, New Book Details was not created.');
    }
};
//Update (PUT) an old Book Details in the Database
const updateBookdetails = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid Book id to update a Book details.');
  }
     const bookId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
     const updateBook = {
      bookISBN: req.body.bookISBN,
           bookTitle: req.body.bookTitle,
           bookDescription: req.body.bookDescription,
           authorName: req.body.authorName,
           releaseDate: req.body.releaseDate,
           publisher: req.body.publisher,
           price: req.body.price
     };
     const response = await mongodb
       .getDatabase()
       .db()
       .collection('books')
       .replaceOne({ _id: bookId }, updateBook);
     console.log(response);
     if (response.modifiedCount > 0) {
       res.status(204).send();
     } else {
       res.status(500).json(response.error || 'Some error occurred while updating the Book details.');
     }
   };
   

//Delete (DELETE) a Book Details from the Database
const deleteBookdetails = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid Book id to delete a Book details.');
  }
    const bookId = new ObjectId(req.params.id);
     // be aware of deleteOne, changes can't be undone
    const response = await mongodb
    .getDatabase()
    .db()
    .collection('books')
    .deleteOne({ _id: bookId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the Book Details.');
    }
  };
    module.exports = { 
        getAllBooksdetails, 
        getSingleBookdetails,
        createBookdetails,
        updateBookdetails,
        deleteBookdetails           
};