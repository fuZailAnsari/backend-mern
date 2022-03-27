const express = require('express')
const router = express.Router();
const paymentController = require('../controllers/paymentController')

// const {
//     processPayment,
//     sendStripApi
// } = require('../controllers/paymentController')

const { isAuthenticated } = require('../middleware/Auth')

router.post('/payment/process',isAuthenticated,paymentController.processPayment)

router.post('/stripeapi',isAuthenticated,paymentController.sendStripApi)


// router.route('/payment/process').post(isAuthenticatedUser, processPayment);
// router.route('/stripeapi').get(isAuthenticatedUser, sendStripApi);

module.exports = router;