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
  
        const bookId = new ObjectId(req.params.id);
        const result = await mongodb            
            .getDatabase()
            .db()
            .collection('books')
            .find({ _id: bookId});
            result.toArray().then((books) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(books[0]);
            });
        };

module.exports = { 
    getAllBooksdetails, 
    getSingleBookdetails,
            
        };