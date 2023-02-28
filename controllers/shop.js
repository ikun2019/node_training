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
      prods: products,
      isAuthenticated: req.session.isLoggedIn
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
      path: '/products',
      isAuthenticated: req.session.isLoggedIn
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
      products: products,
      isAuthenticated: req.session.isLoggedIn
    });
  } catch (err) {
    console.log(err);
  }
};
// * カート追加機能
exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  try {
    // ユーザーのカートを取得
    const cart = await req.user.getCart();
    console.log('cart => ', cart);
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

// ! カート削除機能 POST => /cart-delete-item
// * カート削除機能
exports.postCartDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts({ where: { id: prodId } });
    const product = products[0];
    await product.cartItem.destroy();
    res.redirect('/cart');
  } catch (err) {
    console.log(err);
  }
};

// ! オーダーページ GET => /orders
// * UI表示
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await req.user.getOrders({ include: ['products'] });
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders,
      isAuthenticated: req.session.isLoggedIn
    });
  } catch (err) {
    console.log(err);
  }
};
// * オーダー機能
exports.postOrder = async (req, res, next) => {
  let fetchedCart;
  try {
    const cart = await req.user.getCart();
    fetchedCart = cart;
    const products = await fetchedCart.getProducts();
    const order = await req.user.createOrder();
    const mappedProducts = await products.map(product => {
      product.orderItem = { quantity: product.cartItem.quantity };
      return product;
    });
    await order.addProducts(mappedProducts);
    await fetchedCart.setProducts(null);
    res.redirect('/orders');
  } catch (err) {
    console.log(err);
  }
};
