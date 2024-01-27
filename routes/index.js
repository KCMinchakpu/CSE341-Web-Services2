const router = require('express').Router();


router.get('/', (req, res) => {
    res.send('Hello, Welcome to Books API!')});


module.exports = router;