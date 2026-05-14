const express = require('express');

const userRouter = express.Router()
const {userAuth}  =  require("../Middlewares/auth");
const ConnectionRequestModel = require('../models/connectionRequest');

//Get all the pending connection request for loggedInUser
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{

    try{
 
         const loggedInUser = req.userData; 

         //db call
         const connectionRequest = await ConnectionRequestModel.find({
            toUserId:loggedInUser._id,
            status:"interested"
         }).populate("fromUserId","firstName lastName photoUrl age gender about Skils")
        //  .populate("fromUserId",["firstName", "lastName"])
         

         res.json({
            message:"Data Fetched Successfully..!",
            data:connectionRequest 
         })

    }catch(err){
        res.status(400).send("ERROR Occured in UserRequests: " + err.message)
    }


});


module.exports = userRouter