const router = require('express').Router();
const adminController = require('../controllers/admin');

// ! 商品追加機能 GET & POST => /admin/add-product
// * UI表示
router.get('/add-product', adminController.getAddProduct);
// * 機能部分
router.post('/add-product', adminController.postAddProduct);

// ! 商品一覧表示ページ（Admin Products） GET => /admin/products
// * UI表示
router.get('/products', adminController.getProducts);

module.exports = router;