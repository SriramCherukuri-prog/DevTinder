const express = require("express")
const profileRouter = express.Router()
const {userAuth} = require("../Middlewares/auth")
const UserModel = require("../models/user")
const {validateProfileEditData} = require("../utils/validation") 
const bcrypt = require("bcrypt")


//profile api-  Browser sends cookie automatically when profile request made
//getting all the profiles
profileRouter.get("/profile/view",userAuth,async (req,res)=>{

  try{
    const userData = req.userData

    res.send(userData)
  }catch(err){
    res.status(400).send("Error:" + err.message)
  }
})

//edit the profile
profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
     try{
        if(!validateProfileEditData(req)){
          throw new Error("Invalid Edit Profile Request..")
        }  
   
        const loggedUser  = req.userData
       

        Object.keys(req.body).forEach((key)=>(loggedUser[key] = req.body[key]))
        //saving data to db
        await loggedUser.save()
        res.json({
          message:`${loggedUser.firstName},Your Profile Updated Successfully....!`,
        data:loggedUser, })
  

     }catch(err){
      res.status(400).send("Error:" + err.message)
     }
})

//afterlogin change the password if you want
//change-password  api
profileRouter.post("/profile/changepassword",userAuth,async (req,res)=>{

  try{
 
    const  {oldpassword,newpassword} = req.body

    const user = req.userData; 

    //Checking and verfing user old password;
    const isPasswordValid = await user.validatePassword(oldpassword);

    if(!isPasswordValid){
      throw new Error("Old Password is Invalid..")
    }

    //prevent same password
     if(oldpassword === newpassword){
        throw new Error("New Password should be different")
     }

    //if passwordvalid create a new hash password
    const passwordHash = await bcrypt.hash(newpassword,10);

    //updating hash password;
    user.password = passwordHash;

    //saving new password into database
    await user.save();

    //sending back response;
    res.json({
      message:"Password Updated SuccessFully...!!!"
    })
  }catch(err){
    res.status(400).send("Error Occured in Forgot password:" + err.message)
  }
})
  

module.exports = profileRouter;