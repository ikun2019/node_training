const router = require('express').Router();
const authController = require('../controllers/auth');

// ! ログインページ GET => /login
// * UI表示
router.get('/login', authController.getLogin);
// * 機能部分
router.post('/login', authController.postLogin);

// ! ログアウト POST => /logout
// * 機能部分
router.post('/logout', authController.postLogout);

module.exports = router;