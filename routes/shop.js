const router = require('express').Router();
const shopController = require('../controllers/shop');

// ! 商品一覧表示（トップページ）
// * UI表示
router.get('/', shopController.getProducts);

module.exports = router;