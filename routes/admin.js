const router = require('express').Router();
const productsController = require('../controllers/products');

// ! 商品追加機能 GET & POST => /admin/add-product
// * UI表示
router.get('/add-product', productsController.getAddProduct);
// * 機能部分
router.post('/add-product', productsController.postAddProduct);

module.exports = router;