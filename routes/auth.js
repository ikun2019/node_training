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

// !サインアップ GET & POST => /signup
// *　UI表示
router.get('/signup', authController.getSignup);
// * 機能部分
router.post('/signup', authController.postSignup);

// ! パスワードリセット GET & POST => /reset
// * UI表示
router.get('/reset', authController.getReset);
// * 機能部分
router.post('/reset', authController.postReset);

// ! 新しいパスワードの設定画面 GET & POST => /new-password
// * UI表示
router.get('/reset/:token', authController.getNewPassword);

module.exports = router;