const express = require('express')
const app = express();
const cookieParser = require('cookie-parser')
const productrouter = require('./routes/product')
const barndRoutes = require('./routes/brandsroute')
const auth = require('./routes/users')
const order = require('./routes/order')
const Category = require('./routes/category')
const Wishlists = require('./routes/wishlist')
const subCategory = require('./routes/subCategory')
const Cart = require('./routes/cart')
const payment = require('./routes/payment')

const cloudinary = require('cloudinary')
const multer = require('multer')
const cors = require('cors')
const fileUpload = require('express-fileupload')
require('./models/config/config')
require("dotenv").config();

app.use(cookieParser());
app.use(express.json())
app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(fileUpload());
app.use(cors())
// app.use(fileUpload({
//     useTempFiles: true
// }))
// 
cloudinary.config({
    cloud_name: "dsj9t6adh",
    api_key: "998169537827179",
    api_secret: "OdZZJsvvLEd6rrDWQb0VqQVFFFg"
})

//
app.use('/api', productrouter)
app.use('/api', auth);
app.use('/api', order)
app.use('/api', Category)
app.use('/api', barndRoutes)
app.use('/api', Wishlists)
app.use('/api',barndRoutes)
app.use('/api',subCategory)
app.use('/api',Cart)
app.use('/api',payment)
// schemaName.index({ request: 'text' });
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})