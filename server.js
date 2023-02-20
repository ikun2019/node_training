// ! モジュールの読み込み
const express = require('express');
const dotenv = require('dotenv').config();

// ! アプリの初期化
const app = express();

// ! ミドルウェアの使用
app.use(express.urlencoded({ extended: false }));

// !　ルーティング
app.use('/', require('./routes/index'));

// ! サーバーの待ち受け
app.listen(process.env.PORT);