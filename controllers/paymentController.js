const Stripe = require('stripe');
const stripe = Stripe("sk_test_51JtbWMSEkB7Tvcpf2OUWclZGaXkRPaRn2ZsobCwL7eFNnjpIkFx6HmjVuKRPE6IAVLIiIPVdt77i98AUe0x9KJFj0091FeT80i");

// Process stripe payments   =>   /api/v1/payment/process

exports.processPayment = async (req, res, next) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'inr',

        metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })

}
// Send stripe API Key   =>   /api/v1/stripeapi
exports.sendStripApi =async (req, res, next) => {

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })

}