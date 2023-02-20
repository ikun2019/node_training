const router = require('express').Router();

// * 商品追加ページ表示
// * /admin/add-product
router.get('/add-product', (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  })
});
// ! 商品追加機能
router.post('/add-product', (req, res, next) => {

});

module.exports = router;