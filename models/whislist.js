const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        wishlist: [
            {
                productId: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'Products',
                    // required: true
                },
                quantity: Number,
                name: String,
                price: Number
            }
        ],
        // products: {
        //   type: mongoose.Schema.ObjectId,
        //   ref: "Products"
        // },
        active: {
            type: Boolean,
            default: true
        },
        modifiedOn: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);

