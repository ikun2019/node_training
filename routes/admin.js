const router = require('express').Router();
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

// ! 商品追加機能 GET & POST => /admin/add-product
// * UI表示
router.get('/add-product', isAuth, adminController.getAddProduct);
// * 機能部分
router.post('/add-product', isAuth, adminController.postAddProduct);

// ! 商品編集機能 GET & POST => /admin/edit-product
// * UI表示
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);
// * 機能部分
router.post('/edit-product', isAuth, adminController.postEditProduct);

// ! 商品一覧表示ページ（Admin Products） GET => /admin/products
// * UI表示
router.get('/products', isAuth, adminController.getProducts);

// ! 商品削除機能 POST => /admin/delete-product
// * 機能部分
router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;