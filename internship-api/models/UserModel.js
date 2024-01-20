const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username : {
        type: String,
        required: true,
        min: 3,
        max: 15,
        unique: true
    },
    email : {
        type: String,
        required: true,
        min: 3,
        max: 45,
        unique: true
    },
    password : {
        type: String,
        required: true,
        min: 8,
    },
    data : {
        type: Object,
    }
})
module.exports = mongoose.model("Users",userSchema)