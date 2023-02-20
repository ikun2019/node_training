// * 商品追加ページ表示
// * /admin/add-product
exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};
// ! 商品追加機能
exports.postAddProduct = (req, res, next) => {};