const sequelize = require('../config/database');
const Product = require('../models/Product');

// ! 商品追加機能  GET & POST => /admin/add-product
// * UI表示
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    isAuthenticated: req.isLoggedIn
  });
};
// * 機能部分
exports.postAddProduct = async (req, res, next) => {
  try {
    await req.user.createProduct(req.body);
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
    // const product = await Product.findByPk(prodId);
    const products = await req.user.getProducts({ where: { id: prodId } });
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: true,
      product: products[0],
      isAuthenticated: req.isLoggedIn
    });
  } catch (err) {
    console.log(err);
  }
};
// * 機能部分
exports.postEditProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    // const product = await Product.findByPk(prodId);
    const products = await req.user.getProducts({ where: { id: prodId } });
    const {
      title,
      imageUrl,
      price,
      descripton
    } = req.body;
    products[0].title = title;
    products[0].imageUrl = imageUrl;
    products[0].price = price;
    products[0].descripton = descripton;
    await products[0].save();
    res.redirect('/admin/products');
  } catch (err) {
    console.log(err);
  } 
};

// ! 商品一覧表示ページ（Admin Products） GET => /admin/products
// * UI表示
exports.getProducts = async (req, res, next) => {
  try {
    // const products = await Product.findAll();
    const products = await req.user.getProducts();
    res.render('admin/products', {
      prods: products,
      path: '/admin/products',
      pageTitle: 'Admin Products',
      isAuthenticated: req.isLoggedIn
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
    // const product = await Product.findByPk(prodId);
    const products = await req.user.getProducts();
    products[0].destroy();
    res.redirect('/admin/products');
  } catch (err) {
    console.log(err);
  }
};