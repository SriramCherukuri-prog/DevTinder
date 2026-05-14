const express = require('express');

const userRouter = express.Router()
const {userAuth}  =  require("../Middlewares/auth");
const ConnectionRequestModel = require('../models/connectionRequest');

    const USER_SAFE_DATA = "firstName lastName photoUrl age gender about Skills"

//Get all the pending connection request for loggedInUser
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{

    try{
 
         const loggedInUser = req.userData; 

         //db call
         const connectionRequest = await ConnectionRequestModel.find({
            toUserId:loggedInUser._id,
            status:"interested"
         }).populate("fromUserId",USER_SAFE_DATA)
        //  .populate("fromUserId",["firstName", "lastName"])
         
            if(connectionRequest.length === 0) {
             return res.json({message:"No send request received..."})
        }

         res.json({
            message:"Data Fetched Successfully..!",
            data:connectionRequest 
         })

    }catch(err){
        res.status(400).send("ERROR Occured in UserRequests: " + err.message)
    }


});

//Get all matched connections
userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{

        const loggedInUser = req.userData;
  

        //sriram => venu
        //venu accepted => venu
        //sriram and venu have 1 conncetion
        //hari => venu
        //venu accepted => hari
        //now venu have two connections with sriram and hari
        // hari and sriram have one connection with venu
        //here venu is fromUser or toUser but status must be acccepted  

        const connectionRequests = await ConnectionRequestModel.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"}
            ]
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA)


        const data = connectionRequests.map(row=>{
          

            if(row.fromUserId._id.equals(loggedInUser._id)){
               return row.toUserId
            }
            return row.fromUserId;
        })

        if(data.length === 0) {
            return res.json({message:"You not have any connections Make New Friends...  "})
        }

        res.json({
            message:"Fetch Got it",
            data:data
        })

    }
    catch(err){
        res.status(400).send("ERROR Occured in user conncections: " + err.message)
    }
})


module.exports = userRouter