const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.render('shop', {
    pageTitle: 'Shop',
    path: '/',
    prods: []
  });
});

module.exports = router;