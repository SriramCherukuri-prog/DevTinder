
const mongoose = require("mongoose")

//Defining a schema what userSchema stores info into DB
const userSchema  = mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String 
    }
})

//creating a Model
const UserModel = mongoose.model("User",userSchema)


module.exports = UserModel