const router = require('express').Router();
const productsController = require('../controllers/products');

// ! 商品一覧表示（トップページ） GET => /
// * UI表示
router.get('/', productsController.getProducts);

// ! 商品詳細表示機能 GET => /products/:productId
// * UI表示
router.get('/products/:productId', productsController.getProduct);


module.exports = router;