const User = require('../models/User');

// ! ログインページ GET => /login
// * UI表示
exports.getLogin = async (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.isLoggedIn
  });
};
// * 機能部分
exports.postLogin = async (req, res, next) => {
  // req.isLoggedIn = true;
  const user = await User.findByPk(1);
  req.session.isLoggedIn = true;
  req.session.user = user;
  await req.session.save(err => {
    console.log(err);
    res.redirect('/');
  });
};

// ! ログアウト POST => /logout
// * 機能部分
exports.postLogout = async (req, res, next) => {
  await req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};

// !サインアップ GET & POST => /signup
// *　UI表示
exports.getSignup = async (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Sign up',
    isAuthenticated: req.session.isLoggedIn
  });
};
// * 機能部分
exports.postSignup = async (req, res, next) => {

};