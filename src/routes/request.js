const express = require("express")
const requestRouter = express.Router();
const {userAuth} = require("../Middlewares/auth")

requestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{

  const user = req.userData

  console.log("Connection Request Sent..!!!")
  res.send(user.firstName + " Sent Connection Request..!!!!!")
})


module.exports = requestRouter;