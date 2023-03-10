const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const sendEmail = require('../util/sendEmail');
const { validationResult } = require('express-validator/check');

// ! ログインページ GET => /login
// * UI表示
exports.getLogin = async (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message,
    oldInput: {
      email: '',
      password: ''
    },
    validationErrors: []
  });
};
// * 機能部分
exports.postLogin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    console.log('Errors Array =>', errors.array());
    if (!errors.isEmpty()) {
      return res.status(422).render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: errors.array()[0].msg,
        oldInput: {
          email: email,
          password: password
        },
        validationErrors: errors.array()
      });
    }
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      await req.flash('error', 'emailが無効です');
      return res.status(422).render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: 'Invalid email or password',
        oldInput: {
          email: email,
          password: password
        },
        validationErrors: []
      });
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
    return res.status(422).render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      errorMessage: 'Invalid email or password',
      oldInput: {
        email: email,
        password: password
      },
      validationErrors: []
    });
  } catch (err) {
    console.log(err);
  }
};

// ! ログアウト POST => /logout
// * 機能部分
exports.postLogout = async (req, res, next) => {
  try {
    await req.session.destroy();
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }

};

// !サインアップ GET & POST => /signup
// *　UI表示
exports.getSignup = async (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Sign up',
    errorMessage: message,
    oldInput: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationErrors: []
  });
};
// * 機能部分
exports.postSignup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: errors.array()[0].msg,
        oldInput: {
          email: email,
          password: password,
          confirmPassword: req.body.confirmPassword
        },
        validationErrors: errors.array()
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email: email,
      password: hashedPassword
    });
    res.redirect('/login');
    return await sendEmail({
      email: email,
      subject: 'Signup succeeded!',
      message: '<h1>Your signup is succeeded!</h1>'
    });
  } catch (err) {
    console.log(err);
  }
};

// ! パスワードリセット GET & POST => /reset
// * UI表示
exports.getReset = async (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset',
    errorMessage: message
  });
};
// * 機能部分
exports.postReset = async (req, res, next) => {
  try {
    let token;
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      req.flash('error', '該当するメールアドレスが存在しません');
      return res.redirect('/reset');
    }
    await crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        return res.redirect('/reset');
      }
      token = buffer.toString('hex');
    });
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000;
    await user.save();

    res.redirect('/');
    await sendEmail({
      email: req.body.email,
      subject: 'Password reset',
      message: `
        <h1>Password reset!</h1>
        <p><a href="http://localhost:3000/reset/${token}">link</a></p>
      `
    });
  } catch (err) {
    console.log(err);
  }
};

// ! 新しいパスワードの設定画面 GET & POST => /new-password
// * UI表示
exports.getNewPassword = async (req, res, next) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });
    let message = req.flash('error');
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    res.render('auth/new-password', {
      path: '/new-password',
      pageTitle: '',
      errorMessage: message,
      userId: user.id,
      passwordToken: token
    });
  } catch (err) {
    console.log(err);
  }
};
// * 機能部分
exports.postNewPassword = async (req, res, next) => {
  try {
    let resetUser;
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    const user = await User.findOne({
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
      id: userId
    });
    resetUser = user;
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    resetUser.password = hashedPassword;
    resetUser.resetToken = undefined;
    resetUser.resetTokenExpiration = undefined;
    await resetUser.save();
    res.redirect('/login');
  } catch (err) {
    console.log(err);
  }
};