const express = require('express')
const router = express.Router()

const subCategoryController = require('../controllers/subCategoryController')
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth')

router.post('/subCategory',isAuthenticated,authorizeRoles('admin'), subCategoryController.addSubCategory)

router.get('/getSubcategory', subCategoryController.getSubCategory)

router.put('/subCategory/:id',isAuthenticated, authorizeRoles('admin'), subCategoryController.updateSubCategory)

router.delete("/subCategoryDelete/:id",isAuthenticated, authorizeRoles('admin'), subCategoryController.deleteSubCategory)

router.get('/subCategory/:id', subCategoryController.getSubCategoryById)

module.exports = router;