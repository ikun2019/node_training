const router = require('express').Router();
const authController = require('../controllers/auth');
const { check, body } = require('express-validator/check');
const User = require('../models/User');

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
router.post('/signup',
  [
    check('email')
      .isEmail()
      .withMessage('emailを入力してください')
      .custom((value, { req }) => {
        return User.findOne({ where: { email: value } })
          .then(user => {
            if (user) {
              return Promise.reject('Emailは既に存在します');
            }
          })
      }),
    body('password',
      'Please enter a password with only numbers and text at least 5 characters.'
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('パスワードが一致しません')
        }
        return true;
      })
  ],
  authController.postSignup
);

// ! パスワードリセット GET & POST => /reset
// * UI表示
router.get('/reset', authController.getReset);
// * 機能部分
router.post('/reset', authController.postReset);

// ! 新しいパスワードの設定画面 GET & POST => /new-password
// * UI表示
router.get('/reset/:token', authController.getNewPassword);
// * 機能部分
router.post('/new-password', authController.postNewPassword);

module.exports = router;