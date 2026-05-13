
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const validator  = require("validator")

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
        enum:{
            values:["male","female","others"],
            message:`{VALUE} gender is not supported`
        },
        // validate(value){
        //     if(!["male","female","others"].includes(value.toLowerCase())){
        //         throw new Error("Gender Data is not valid")
        //     }
        // },
    },
    photoUrl:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3_DCFxEwpnHdDMKs1wO55guS6Q5O65kYG6Q&s",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Image URL: " + value)
            }
        }

    },
    about:{
        type:String,
        default:"This is About Description of User..!"
    },
    Skills:{
        type:[String]
    }
},{ timestamps: true })

//creating a JWT token and attaching to schema method
userSchema.methods.getJWT = async function(){
    const user = this
    const token = await jwt.sign({_id:user._id},"Sriram@123");
    return token;
}

//Checking user password is valid or not according to DB
userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password
    const isPasswordValid =  await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPasswordValid;
}

//creating a Model
const UserModel = mongoose.model("User",userSchema)



module.exports = UserModel