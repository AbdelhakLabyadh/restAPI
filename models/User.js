
const mongoose = require('mongoose')

const userSchema =  mongoose.Schema ({
    id: {type: Number, unique:true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: Number, required: true} 
})

const User = mongoose.model('User', userSchema)

module.exports = User
