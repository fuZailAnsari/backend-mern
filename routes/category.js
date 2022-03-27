const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload')

const categoryController = require('../controllers/categories')
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth')

// router.use(fileUpload({
//     useTempFiles: true
// }))

router.post('/category',isAuthenticated,authorizeRoles('admin'), categoryController.categories)

router.get('/getcategory', categoryController.getCategory)

router.put('/category/:id',isAuthenticated, authorizeRoles('admin'), categoryController.updateCategory)

router.delete("/deletecategories/:id",isAuthenticated, authorizeRoles('admin'), categoryController.deleteCategory)

router.get('/category/:id', categoryController.getCategoryById)



module.exports = router;