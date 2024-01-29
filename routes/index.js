const router = require('express').Router();

router.use('/', require('./swagger'));
router.get('/', (req, res) => {
    // swagger.tags = ['Hello Wordld']
    res.send('Hello, Welcome to Books API!')});

router.use('/books', require('./books'));


module.exports = router;