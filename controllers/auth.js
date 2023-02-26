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
  req.session.isLoggedIn = true;
  res.redirect('/');
};

// ! ログアウト POST => /logout
// * 機能部分
exports.postLogout = async (req, res, next) => {
  await req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};