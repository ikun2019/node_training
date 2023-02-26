// ! モジュールの読み込み
const colors = require('colors');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const sequelize = require('./config/database');

const Product = require('./models/Product');
const User = require('./models/User');
const Cart = require('./models/Cart');
const CartItem = require('./models/CartItem');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');

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
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
    })
});

// !　ルーティング
app.use('/admin', adminRoute);
app.use('/', shopRoute);
app.use(errorRoute.get404Page);

// ! アソシエーション
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });


// ! サーバーの待ち受け
// sequelize.sync({ alter: true })
// sequelize.sync({ force: true })
sequelize.sync()
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({
        name: 'ikun',
        email: 'test@test.com'
      });
    }
    return user;
  })
  .then(user => {
    return user.createCart();
  })
  .then(result => {
    // console.log('result:', result);
    app.listen(process.env.PORT, () => {
      console.log(`Server is running PORT${process.env.PORT}`.bgGreen);
    });
  })
  .catch(err => {
    console.log(err);
  });