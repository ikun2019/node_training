const router = require('express').Router();

// ! 商品追加機能 => /admin/add-product
// * UI表示
router.get('/add-product', require('../controllers/admin').getAddProduct);
// * 機能部分
router.post('/add-product', require('../controllers/admin').postAddProduct);

module.exports = router;