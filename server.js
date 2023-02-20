// ! モジュールの読み込み
const express = require('express');
const dotenv = require('dotenv').config();

// ! アプリの初期化
const app = express();

// ! ミドルウェアの使用
app.use(express.urlencoded({ extended: false }));

// !　ルーティング
app.use('/admin', require('./routes/admin'));
app.use('/', require('./routes/shop'));
app.use((req, res, next) => {
  res.status(404).send('<h1>Page not Found</h1>');
});

// ! サーバーの待ち受け
app.listen(process.env.PORT);