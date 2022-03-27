const express = require('express')
const router = express.Router()
const productController = require('../controllers/ProductController')
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth')
// const authenticated = require('../middleware/authenticated')
// const auth = require('../middleware/authenticated')
router.post('/product/new' ,isAuthenticated, authorizeRoles('admin','seller'), productController.newproduct)

//get all products in homepage
router.get('/products', productController.Getproduct)

router.get('/products/search/:name', productController.search)
// sort by price 
router.put('/product/:id', isAuthenticated, authorizeRoles('admin'), productController.updateProducts)


router.get('/productsid/:id', productController.GetproductById)
// router .delete('/product/:id',isAuthenticated, authorizeRoles('admin'), deleteProducts)
// router.get('product/:id',productController.getProductById)

router.get('/products/sortbyprice/:price', productController.sortbyprice)

//gt
router.get('/products/sortbypriceeq/:price', productController.sortbypriceeq)

//gt
router.get('/products/sortbypricetwo', productController.lessthensortbyprice)


router.get('/getproductcategory/:id', productController.getListByCategory);
// product review 
router.get('/productreview/:id', productController.productreview);

// promotion 
router.get('/productpromotion/:id', productController.Promotion);

// get product by user id
router.get('/product/seller', isAuthenticated, productController.getProductByUserId)


// 
router.get('/admin/products', isAuthenticated, authorizeRoles('admin', 'seller'), productController.Getproduct)

router.get('/admin/search/:name', isAuthenticated, authorizeRoles('admin', 'seller'), productController.search)

router.put('/admin/update/:id', isAuthenticated, authorizeRoles('admin', 'seller'), productController.updateProducts)

router.delete('/admin/delete/:id', isAuthenticated, authorizeRoles('admin', 'seller'), productController.deleteProducts)

module.exports = router
