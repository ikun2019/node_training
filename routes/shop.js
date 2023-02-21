const router = require('express').Router();
const productsController = require('../controllers/products');

// ! 商品一覧表示（トップページ） GET => /
// * UI表示
router.get('/', productsController.getProducts);

module.exports = router;