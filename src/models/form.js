const mongoose = require("mongoose");

const userForm = new mongoose.Schema({
    name:{
        type:String
    },
    age:{
        type:Number
    },
    designation:{
        type:String
    }
})

const UserForm = mongoose.model("UserForm",userForm)

module.exports = UserForm;