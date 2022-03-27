const mongoose = require('mongoose')

const subCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
    },
    size: {
        type: String
    }
})


module.exports.SubCategory = mongoose.model('SubCategory', subCategorySchema)