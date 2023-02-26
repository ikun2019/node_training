const router = require('express').Router();
const authController = require('../controllers/auth');

// ! ログインページ GET => /login
// * UI表示
router.get('/login', authController.getLogin);

module.exports = router;