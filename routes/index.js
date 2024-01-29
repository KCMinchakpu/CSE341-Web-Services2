const router = require('express').Router();

router.use('/', require('./swagger'));
// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });

router.use('/books', require('./books'));


module.exports = router;