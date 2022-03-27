const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    icon: {
        type: String
    },
    image: {
        type: String
    },
    subCategory: {
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory'
    },
})


module.exports.Category = mongoose.model('Category', categorySchema)