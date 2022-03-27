const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({

    date: { type: Date, default: Date.now },

    brandName: { type: String, },

    contactPerson: { type: String, },

    contact: { type: Number, },

    email: { type: String, },

    marketplaceUrl: { type: String, },

    ownwebsiteUrl: { type: String, },

    // category: { type: mongoose., },

    city: { type: String, },

    revenueinCrores: { type: Number, },

    monthlyRevenue: { type: Number },
   
    additionalInformation: { type: String },

    approval :{
        type:Boolean,
        default:false
    }
})
// compare password methods

module.exports = mongoose.model('Brands', brandSchema)