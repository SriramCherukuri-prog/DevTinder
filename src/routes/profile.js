const express = require("express")
const profileRouter = express.Router()
const {userAuth} = require("../Middlewares/auth")
const UserModel = require("../models/user")
//profile api-  Browser sends cookie automatically when profile request made

profileRouter.get("/profile",userAuth,async (req,res)=>{

  try{
    const userData = req.userData

    res.send(userData)
  }catch(err){
    res.status(400).send("Error:" + err.message)
  }
})

module.exports = profileRouter;