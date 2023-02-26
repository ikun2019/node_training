const User = require('../models/User');

// ! ログインページ GET => /login
// * UI表示
exports.getLogin = async (req, res, next) => {
  console.log('req session =>' ,req.session);
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