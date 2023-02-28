const bcrypt = require('bcryptjs');

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
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.redirect('/login');
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (isMatched) {
      req.session.isLoggedIn = true;
      req.session.user = user;
      return await req.session.save(err => {
        console.log(err);
        res.redirect('/');
      });
    }
    res.redirect('/login');
  } catch (err) {
    console.log(err);
  }
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
  const email = req.body.email;
  const password = req.body.password;
  try {
    const userDoc = await User.findOne({ where: { email: email } });
    if (userDoc) {
      return res.redirect('/signup');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email: email,
      password: hashedPassword
    });
    res.redirect('/login');
  } catch (err) {
    console.log(err);
  }
};