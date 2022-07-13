var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    userName: {
        type: String,
        lowercase: true,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: Boolean,
        default: false,
    },
})

var User = mongoose.model('user', userSchema)
module.exports = User
