const router = require('express').Router();
const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

// ! 商品一覧ページ（トップ） GET => /
// * UI表示
router.get('/', shopController.getIndex);

// ! 商品一覧ページ（Products） GET => /products
// * UI表示
router.get('/products', shopController.getProducts);

// ! 商品詳細ページ GET => /products/:productId
// * UI表示
router.get('/products/:productId', shopController.getProduct);

// ! カートページ GET & POST => /cart
// * UI表示
router.get('/cart', isAuth, shopController.getCart);
// * カート追加機能
router.post('/cart', isAuth, shopController.postCart);

// ! カート削除機能 POST => /cart-delete-item
// * カート削除機能
router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

// ! オーダーページ GET => /orders
// * UI表示
router.get('/orders', isAuth, shopController.getOrders);
// * オーダー機能
router.post('/create-order', isAuth, shopController.postOrder);

// ! 請求書のダウンロード GET => /orders/:orderId
router.get('/orders/:orderId', isAuth, shopController.getInvoice);

module.exports = router;