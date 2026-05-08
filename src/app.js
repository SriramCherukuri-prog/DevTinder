const express = require("express");
const connectDB = require("./config/database");
const UserModel = require("./models/user") 
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const {userAuth} = require("./Middlewares/auth")


const app = express();

//middlewares we can used for all the routes then we use app.use()
app.use(express.json())
app.use(cookieParser())

//SIGNUP API

app.post("/signup",async (req,res)=>{


  //save data to database
  try{
    
  //validate data
  validateSignUpData(req);


  //encrypt password

  const {firstName,lastName,emailid,password} = req.body

  const passwordHash  = await bcrypt.hash(password,10)


   
  const User = new UserModel({
    firstName,lastName,emailid,password:passwordHash
  })
    await User.save()
    res.send("User Added to DataBase Successfully...!")
   
  }catch(err){
    res.status(400).send("ERROR:"+ err.message)
  }
        

})

//LOGIN API

app.post("/login", async(req,res)=>{
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
      res.cookie("token",token,{expires: new Date(Date.now()+8 * 3600000)})
      
      res.send("Login Successfull..!!")
    }else{
      throw new Error("Invalid credentials")
    }
  }catch(err){
    res.status(400).send("ERROR:"+ err.message)
  }
})

//PROFILE API - Browser sends cookie automatically when profile request made

app.get("/profile",userAuth,async (req,res)=>{

  try{
    const userData = req.userData

    res.send(userData)
  }catch(err){
    res.status(400).send("Error:" + err.message)
  }
})

app.post("/sendConnectionRequest",userAuth,async(req,res)=>{

  const user = req.userData

  console.log("Connection Request Sent..!!!")
  res.send(user.firstName + " Sent Connection Request..!!!!!")
})

app.get("/user",async(req,res)=>{
    const email = req.body.emailid

    try{
      const userinfo= await UserModel.find({})
      if(userinfo.length===0){
            res.status(404).send("User Not Found")
          }else{
            res.send(userinfo)
          }
    }catch(err){
        res.status(401).send("Something Went Wrong")
    }

    
})


//Feed API - GET/feed => all the users Data

app.get("/feed", async (req,res)=>{
  try{

    const users = await UserModel.find({})
    res.send(users) 

  }catch(err){
    res.status(401).send("something went wrong")
  }
})

//Delete API- Delete a user from Database

app.delete("/del",async(req,res)=>{

  const userId = req.body.userId
 try{
      const UserDel = await UserModel.findByIdAndDelete(userId) 
       res.send("User Deleted Successfully.." )
 }catch(err){
       res.status(400).send("Error...")
 }

})

//Update  date of user in database
app.patch("/user/:userid",async(req,res)=>{
   const userid = req.params.userid
   const data = req.body

   try{
    const isAllowed = ["firstName","password","age","gender","Skills"]

    const isUpdatedAllowed = Object.keys(data).every((item)=> isAllowed.includes(item))

    if(!isUpdatedAllowed){
        throw new Error("Updated Not Allowed..!!")
    }
    if(data.Skills.length > 4){
      throw new Error("Skills cannot be added morethan 4")
    }
     const userUp = await UserModel.findByIdAndUpdate(userid,data,{runValidators:true}) 
     console.log(userUp)
     res.send("User Updated Successfully...")
   }catch(err){
    res.status(400).send("Update Error:"+ err.message)
   }
})






connectDB()
  .then(()=>{
    console.log("DataBase Connected Successfully....!!")
    app.listen(2000,()=>{
    console.log("Server is listing on port 2000 successfully...!")
   })
}).catch((err)=>{
        console.log("DataBase not connected Successfully...!!")
    })

