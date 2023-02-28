// ! モジュールの読み込み
const colors = require('colors');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/database');
const csrf = require('csurf');

const Product = require('./models/Product');
const User = require('./models/User');
const Cart = require('./models/Cart');
const CartItem = require('./models/CartItem');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const errorRoute = require('./controllers/error');
const authRoute = require('./routes/auth');

// ! アプリの初期化
const app = express();

// ! ミドルウェアの使用
const store =  new SequelizeStore({
  db: sequelize
});
const csrfProtection = csrf();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false,
  store: store
}));
app.use(csrfProtection);
app.use( async (req, res, next) => {
  if (req.session.user) {
    const user = await User.findByPk(req.session.user.id);
    req.user = user;
    if (!await req.user.getCart()) {
      await req.user.createCart();
    }
  };
  next();
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});


// !　ルーティング
app.use('/admin', adminRoute);
app.use(shopRoute);
app.use(authRoute);
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
sequelize.sync({ alter: true })
  .then(result => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running PORT${process.env.PORT}`.bgGreen);
    });
  })
  .catch(err => {
    console.log(err);
  });
