const sequelize = require('../config/database');
const Product = require('../models/Product');
const { validationResult } = require('express-validator');

// ! 商品追加機能  GET & POST => /admin/add-product
// * UI表示
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    isAuthenticated: req.session.isLoggedIn,
    hasError: false,
    errorMessage: null
  });
};
// * 機能部分
exports.postAddProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!req.file) {
      return res.status(422).render('admin/edit-product', {
        path: '/admin/add-product',
        pageTitle: 'Add Product',
        editing: false,
        hasError: true,
        product: {
          title: req.body.title,
          price: req.body.price,
          descripton: req.body.descripton
        },
        errorMessage: 'Attached file is not an image',
        validationErrors: []
      });
    }
    const imageUrl = req.file.path;

    if (!errors.isEmpty()) {
      return res.status(422).render('admin/edit-product', {
        path: '/admin/edit-product',
        pageTitle: 'Add Product',
        editing: false,
        hasError: true,
        product: {
          title: req.body.title,
          imageUrl: req.file,
          price: req.body.price,
          descripton: req.body.descripton
        },
        errorMessage: errors.array()[0].msg
      });
    }
    await req.user.createProduct({
      title: req.body.title,
      imageUrl: imageUrl,
      price: req.body.price,
      description: req.body.description
    });
    res.redirect('/');
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
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
      isAuthenticated: req.session.isLoggedIn,
      hasError: false,
      errorMessage: null
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
// * 機能部分
exports.postEditProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    // const product = await Product.findByPk(prodId);
    const products = await req.user.getProducts({ where: { id: prodId } });
    if (products[0].userId !== req.user.id) {
      return res.redirect('/');
    }
    const image = req.file;
    const {
      title,
      price,
      description
    } = req.body;
    products[0].title = title;
    products[0].price = price;
    if (image) {
      products[0].imageUrl = image.path;
    }
    products[0].description = description;
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
    console.log('reqUserId =>', req.user.id);
    const products = await req.user.getProducts({ where: { userId: req.user.id } });
    res.render('admin/products', {
      prods: products,
      path: '/admin/products',
      pageTitle: 'Admin Products',
      isAuthenticated: req.session.isLoggedIn
    });
  } catch (err) {
    console.log(err);
  }
};

// ! 商品削除機能 POST => /admin/delete-product
// * 機能部分
exports.postDeleteProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    // const product = await Product.findByPk(prodId);
    const products = await req.user.getProducts({ where: { id: prodId, userId: req.user.id } });
    products[0].destroy();
    res.redirect('/admin/products');
  } catch (err) {
    console.log(err);
  }
};