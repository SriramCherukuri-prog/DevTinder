const express = require("express")
const profileRouter = express.Router()
const {userAuth} = require("../Middlewares/auth")
const UserModel = require("../models/user")
const {validateProfileEditData} = require("../utils/validation") 

//profile api-  Browser sends cookie automatically when profile request made

profileRouter.get("/profile/view",userAuth,async (req,res)=>{

  try{
    const userData = req.userData

    res.send(userData)
  }catch(err){
    res.status(400).send("Error:" + err.message)
  }
})

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

  

module.exports = profileRouter;