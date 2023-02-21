const Product = require('../models/Product');


// ! 商品追加機能 => /admin/add-product
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