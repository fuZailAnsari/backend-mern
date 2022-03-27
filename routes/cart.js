const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart')
const { isAuthenticated } = require('../middleware/Auth')


router.post('/addtocart/:id',isAuthenticated,cartController.addCart)
// router.post('/addtocart', isAuthenticated, cartController.addCart)

router.get('/getcart', isAuthenticated, cartController.getCart)

// need to wqork on it
router.delete('/deletecartbyid/:id',isAuthenticated,cartController.deletebyId)

router.delete('/deletecart', isAuthenticated, cartController.emptyCart)


module.exports = router
