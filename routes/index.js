const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.end('Hello');
});

module.exports = router;