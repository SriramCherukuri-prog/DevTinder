
const mongoose = require("mongoose")

//Defining a schema what userSchema stores info into DB
const userSchema  = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:20,
    },
    lastName:{
        type:String
    },
    emailid:{
        type:String,
        required:true,
        unique: true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
         trim:true
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender Data is not valid")
            }
        },
    },
    about:{
        type:String,
        default:"This is About Description of User..!"
    },
    Skills:{
        type:[String]
    }
},{ timestamps: true })

//creating a Model
const UserModel = mongoose.model("User",userSchema)

UserModel.inspect()
console.log(UserModel)

module.exports = UserModel