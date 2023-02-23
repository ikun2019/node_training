const Product = require('../models/Product');

// ! 商品一覧ページ（トップ） GET => /
// * UI表示
exports.getIndex = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render('shop/index', {
      pageTitle: 'Shop',
      path: '/',
      prods: products
    });
  } catch (err) {
    console.log(err);
  }
};

// ! 商品一覧表示機能 GET => /products
// * UI表示
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render('shop/product-list', {
      pageTitle: 'Shop',
      path: '/products',
      prods: products
    });
  } catch (err) {
    console.log(err);
  }
};

// ! 商品詳細表示機能 GET => /products/:productId
// * UI表示
exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  try {
    const product = await Product.findByPk(prodId);
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  } catch (err) {
    console.log(err);
  }
};

// ! カート表示機能 GET => /cart
// * UI表示
exports.getCart = async (req, res, next) => {
  try {
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart'
    });
  } catch (err) {
    console.log(err);
  }
};

// ! 注文表示機能 GET => /checkout
exports.getCheckout = async (req, res, next) => {
  try {
    res.render('shop/checkout', {
      path: '/checkout',
      pageTitle: 'Checkout'
    });
  } catch (err) {
    console.log(err);
  }
};

// ! オーダーページ GET => /orders
exports.getOrders = async (req, res, next) => {
  try {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders'
    });
  } catch (err) {
    console.log(err);
  }
};