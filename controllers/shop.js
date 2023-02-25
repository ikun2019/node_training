const Product = require('../models/Product');
const Cart = require('../models/Cart');

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

// ! カート表示機能 GET & POST => /cart
// * UI表示
exports.getCart = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: products
    });
  } catch (err) {
    console.log(err);
  }
};
// * カート追加機能 TODO:
exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  try {
    // ユーザーのカートを取得
    const cart = await req.user.getCart();
    fetchedCart = cart;
    // 選択した商品が既にカートに入っているか確認
    const cartProducts = await cart.getProducts({ where: { id: prodId } });
    // 商品が入っている場合の処理
    if (cartProducts.length > 0) {
      let cartProduct;
      cartProduct = cartProducts[0];
      
      const oldQuantity = cartProduct.cartItem.quantity;
      newQuantity = oldQuantity + 1;
      fetchedCart.addProduct(cartProduct, {
        through: { quantity: newQuantity }
      });
    } else {
      // 商品が入っていなかった場合の処理
      const product = await Product.findByPk(prodId);
      fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    }
    res.redirect('/cart');
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