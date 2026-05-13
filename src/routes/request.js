const express = require("express")
const requestRouter = express.Router();
const {userAuth} = require("../Middlewares/auth")
const ConnectionRequestModel = require("../models/connectionRequest") 
const UserModel = require("../models/user")

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{

  try{

    const fromUserId  = req.userData._id;
    const toUserId = req.params.toUserId
    const status = req.params.status
    
    

    const allowedStatus = ["ignored","interested"]

    if(!allowedStatus.includes(status)){
      //if you not write return the code will move a head...
      return res.status(400).json({message:"Invalid Status Type.. " + status})
    }

    //if userId is exits in my db or not..
    const toUser = await UserModel.findById(toUserId)

    if(!toUser){
      return res.status(400).json({message:"No user Found..!"})
    }

    //If there is an existing connectionRequest not allow to send request again

    const existingConnectionRequest = await ConnectionRequestModel.findOne({
      $or:[
        { fromUserId,toUserId },
        {fromUserId:toUserId,toUserId:fromUserId}
      ]
    
    })

    if(existingConnectionRequest){
      return res.status(400).json({message:"Connection Request already exists!!"})
    }

    const connectionRequest = new ConnectionRequestModel({
      fromUserId,toUserId,status
    })

    const data = await connectionRequest.save()
    
    res.json({
      message:req.userData.firstName + " has " + status + " and sent a connection request to " + toUser.firstName,
      data
    })

  }catch(err){
    res.status(400).send("Error Occured in Connection Request: "+ err.message)
  }
  

})


module.exports = requestRouter;