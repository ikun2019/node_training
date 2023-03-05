const router = require('express').Router();
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');
const { body } = require('express-validator/check');

// ! 商品追加機能 GET & POST => /admin/add-product
// * UI表示
router.get('/add-product', isAuth, adminController.getAddProduct);
// * 機能部分
router.post('/add-product',
  isAuth,
  [
    body('title')
      .isLength({ min: 3 })
      .trim(),
    // body('imageUrl')
    //   .isURL(),
    body('price')
      .isFloat(),
    body('description')
      .isLength({ min: 8, max: 400 })
      .trim()
  ],
  adminController.postAddProduct);

// ! 商品編集機能 GET & POST => /admin/edit-product
// * UI表示
router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);
// * 機能部分
router.post('/edit-product',
  isAuth,
  [
    body('title')
      .isLength({ min: 3 })
      .trim(),
    // body('imageUrl')
    //   .isURL(),
    body('price')
      .isFloat(),
    body('description')
      .isLength({ min: 8, max: 400 })
      .trim()
  ],
  adminController.postEditProduct);

// ! 商品一覧表示ページ（Admin Products） GET => /admin/products
// * UI表示
router.get('/products', isAuth, adminController.getProducts);

// ! 商品削除機能 POST => /admin/delete-product
// * 機能部分
router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;