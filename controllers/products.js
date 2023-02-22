const Product = require('../models/Product');

// ! 商品追加機能  GET & POST => /admin/add-product
// * UI表示
exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};
// * 機能部分
exports.postAddProduct = async (req, res, next) => {
  try {
    console.log(req.body);
    await Product.create(req.body);
    res.redirect('/');
  } catch (err) {
    res.redirect('/admin/add-product');
  }
};

// ! 商品一覧表示機能 GET => /
// * UI表示
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render('shop', {
      pageTitle: 'Shop',
      path: '/',
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
  const product = await Product.findByPk(prodId);
  res.render('shop/product-detail', {
    product: product,
    pageTitle: product.title,
    path: '/products'
  });
};