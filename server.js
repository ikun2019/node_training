// ! モジュールの読み込み
const express = require('express');
const dotenv = require('dotenv').config();

// ! アプリの初期化
const app = express();


// ! サーバーの待ち受け
app.listen(process.env.PORT);