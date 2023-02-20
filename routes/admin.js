const router = require('express').Router();

// * 商品追加ページ表示
// * /admin/add-product
router.get('/add-product', require('../controllers/admin').getAddProduct);
// ! 商品追加機能
router.post('/add-product', require('../controllers/admin').postAddProduct);

module.exports = router;