const validator = require('../pathfinders/validate');

const saveBookdetails = (req, res, next) => {
  const validationRule = {
    bookISBN: 'required|string',
    bookTitle: 'required|string',
    bookDescription: 'required|String',
    authorName: 'required|string',
    releaseDate: 'required|string',
    publisher: 'required|string',
    price: 'required|string'

  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveBookdetails
};
