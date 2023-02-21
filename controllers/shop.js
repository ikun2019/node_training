const Product = require('../models/Product');

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