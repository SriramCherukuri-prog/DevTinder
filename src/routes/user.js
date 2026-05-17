const express = require('express');

const userRouter = express.Router()
const {userAuth}  =  require("../Middlewares/auth");
const ConnectionRequestModel = require('../models/connectionRequest');
const UserModel = require("../models/user")

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

userRouter.get("/user/feed",userAuth,async(req,res)=>{
    try{
        //user will get the feed of all the users who are not connected to him and also not send any request to him
        //user will not see himself in feed
        // he should not see cards of his connections
        // not see cards of ingnored users
        // already sent connncection request 
          const loggedInUser = req.userData;

          //pageination 
          const page = parseInt(req.query.page) || 1
          let limit = parseInt(req.query.limit) || 10;
          limit = limit > 50 ? 50 : limit
          const skip = (page - 1) * limit

          //finding the connection requests of loggedInuser which i have (sent + received)
          const connectionRequests = await ConnectionRequestModel.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
          }).select("fromUserId toUserId status")

          //hideing the users from feed who are in connection request with loggedInUser
          const hideUsersFromFeed = new Set();
          connectionRequests.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
          })
    

          //Db call
          const feedUsers = await UserModel.find({
            $and:[
              {_id: { $nin:Array.from(hideUsersFromFeed) } },
              {_id: { $ne:loggedInUser._id } } 
            ]
        
          }).select(USER_SAFE_DATA).skip(skip).limit(limit)


          res.status(200).json({
            message:"Feed Fetched Successfully..!",
            page,
            data:feedUsers
          })

    }catch(err){
        res.status(400).send(  "ERROR Occured in Feed API: "
            + err.message)
    }
})

module.exports = userRouter