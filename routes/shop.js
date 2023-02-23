const router = require('express').Router();
const shopController = require('../controllers/shop');

// ! 商品一覧ページ（トップ） GET => /
// * UI表示
router.get('/', shopController.getIndex);

// ! 商品一覧ページ（Products） GET => /products
// * UI表示
router.get('/products', shopController.getProducts);

// ! 商品詳細ページ GET => /products/:productId
// * UI表示
router.get('/products/:productId', shopController.getProduct);

// ! カートページ GET => /cart
// * UI表示
router.get('/cart', shopController.getCart);

// ! オーダーページ GET => /orders
router.get('/orders', shopController.getOrders);

// ! 注文ページ GET => /checkout
// *  UI表示
router.get('/checkout', shopController.getCheckout);


module.exports = router;