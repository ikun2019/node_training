// ! モジュールの読み込み
const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();

// ! アプリの初期化
const app = express();

// ! ミドルウェアの使用
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// !　ルーティング
app.use('/admin', require('./routes/admin'));
app.use('/', require('./routes/shop'));
app.use((req, res, next) => {
  res.status(404).send('<h1>Page not Found</h1>');
});

// ! サーバーの待ち受け
app.listen(process.env.PORT);