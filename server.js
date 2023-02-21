// ! モジュールの読み込み
const colors = require('colors');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const sequelize = require('./config/database');

// ! アプリの初期化
const app = express();

// ! ミドルウェアの使用
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// !　ルーティング
app.use('/admin', require('./routes/admin'));
app.use('/', require('./routes/shop'));
app.use((req, res, next) => {
  res.status(404)
    .render('404', {
      pageTitle: 'Page Not Found!'
    });
});

// ! サーバーの待ち受け
sequelize.sync({ alter: true })
  .then(result => {
    console.log('result:', result);
    app.listen(process.env.PORT, () => {
      console.log(`Server is running PORT${process.env.PORT}`.bgGreen);
    });
  })
  .catch(err => {
    console.log(err);
  });