// ! ログインページ GET => /login
// * UI表示
exports.getLogin = async (req, res, next) => {
  console.log(req.get('Cookie'));
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.isLoggedIn
  });
};
// * 機能部分
exports.postLogin = async (req, res, next) => {
  // req.isLoggedIn = true;
  res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
  res.redirect('/');
};