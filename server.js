// ! モジュールの読み込み
const colors = require('colors');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const sequelize = require('./config/database');

const Product = require('./models/Product');
const User = require('./models/User');
const Cart = require('./models/Cart');

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const errorRoute = require('./controllers/error');

// ! アプリの初期化
const app = express();

// ! ミドルウェアの使用
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// !　ルーティング
app.use('/admin', adminRoute);
app.use('/', shopRoute);
app.use(errorRoute.get404Page);

// ! アソシエーション
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);

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