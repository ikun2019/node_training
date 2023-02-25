const Product = require('../models/Product');

// ! 商品追加機能  GET & POST => /admin/add-product
// * UI表示
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
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

// ! 商品編集機能 GET & POST => /admin/edit-product/:productId
// * UI表示
exports.getEditProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  try {
    const product = await Product.findByPk(prodId);
    console.log(product);
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: true,
      product: product
    });
  } catch (err) {
    console.log(err);
  }
};
// * 機能部分
exports.postEditProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    const product = await Product.findByPk(prodId);
    const {
      title,
      imageUrl,
      price,
      descripton
    } = req.body;
    product.title = title;
    product.imageUrl = imageUrl;
    product.price = price;
    product.descripton = descripton;
    await product.save();
    res.redirect('/admin/products');
  } catch (err) {
    console.log(err);
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

// ! 商品削除機能 POST => /admin/delete-product
// * 機能部分
exports.postDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    const product = await Product.findByPk(prodId);
    product.destroy();
    res.redirect('/admin/products');
  } catch (err) {
    console.log(err);
  }
};