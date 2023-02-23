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
    await Product.create(req.body);
    res.redirect('/');
  } catch (err) {
    res.redirect('/admin/add-product');
  }
};

// ! 商品一覧表示ページ（Admin Products） GET => /admin/products
// * UI表示
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render('admin/products', {
      prods: products,
      path: '/admin/products',
      pageTitle: 'Admin Products'
    });
  } catch (err) {
    console.log(err);
  }
};