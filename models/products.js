const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        default: 0.0
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0
    },
    images: 
        [{
            public_id: {
                type: String,
            },
            url: {
                type: String,
            }
        }]
    ,
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    },
    subCategory: {
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory'
    },
    IsFeature:{
        type:Boolean,
        default:'false'
    },
    wishlist:{
        type:Boolean,
        default:"false"
    },
    wishlistPrice:{
        type:Number
    },
    discount: {
        type: Number
    },
    qty:{
        type:Number
    },
    slashPrice: {
        type: Number
    },
    seller: {
        type: String,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    numbOfReviews: {
        type: Number
    },
    reviews: [{
        name: {
            type: String,
        },
        rating: {
            type: Number,
        },
        comment: {
            type: String,
        }
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

})

productSchema.index({ request: 'name' });
module.exports = mongoose.model('Products', productSchema)