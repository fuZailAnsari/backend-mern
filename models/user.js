const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    // url:{
    //     type:String,
    //     // required:true
    // },
    // product:{
    //     type:mongoose.Schema.objectId,
    //     ref:'Products'
    // },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetpassword: String,
    resetpasswordExpire: Date
})
// compare password methods
userSchema.methods.comparePassword = async function(enteredpassword){
    return await bcrypt.compare(enteredpassword,this.password)
}


userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id, email: this.email }, process.env.JWT, {
        expiresIn: '7d'
    })
}

userSchema.methods.reset = function () {
    const resetToken = crypto.randomBytes(20).toString('hex')

    this.resetpassword = crypto.createHash('sha256').update(resetToken).digest('hex')

    this.resetpasswordExpire = Date.now() + 30 * 60 * 1000
    return resetToken;
}

// userSchema.methods.deleteToken=function(token,cb){
//     var user=this;

//     user.update({$unset : {token :1}},function(err,user){
//         if(err) return cb(err);
//         cb(null,user);
//     })
// }
module.exports = mongoose.model('User', userSchema)
