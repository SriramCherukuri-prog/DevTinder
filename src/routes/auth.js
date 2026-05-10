const express = require('express');
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation")
const UserModel = require("../models/user")
const bcrypt = require("bcrypt") 
const cookieParser = require("cookie-parser")

//signup api
authRouter.post("/signup",async (req,res)=>{


  //save data to database
  try{
    
  //validate data
  validateSignUpData(req);


  //encrypt password

  const {firstName,lastName,emailid,password,gender,photoUrl} = req.body

  const passwordHash  = await bcrypt.hash(password,10)


   
  const User = new UserModel({
    firstName,lastName,emailid,password:passwordHash,gender,photoUrl
  })
    await User.save()
    res.send("User Added to DataBase Successfully...!")
   
  }catch(err){
    res.status(400).send("ERROR:"+ err.message)
  }
        

})

//login api
authRouter.post("/login", async(req,res)=>{
  try{

    const {emailid,password} = req.body

    //email validation
    const user = await UserModel.findOne({emailid})
    // console.log(user)
    if(!user){
      throw new Error("User email Id not found")
    }
    
    
    //compare password validation
    const isPasswordValid = await user.validatePassword(password)
   
      // console.log(isPasswordValid)
    if(isPasswordValid){

      //getting JWT token from schemamethod function which we created
      const token = await user.getJWT();
      
      //Cookie stores this JWT token
      res.cookie("token",token)
      
      res.send("Login Successfull..!!")
    }else{
      throw new Error("Invalid credentials")
    }
  }catch(err){
    res.status(400).send("ERROR:"+ err.message)
  }
})

//logout api
authRouter.post("/logout",(req,res)=>{
    res.cookie("token",null,{
        //setted expiry time as current time that means now
        expires:new Date(Date.now())
    }).send("Logout Succesufully..")
})



module.exports = authRouter;