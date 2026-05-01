const express = require("express");
const connectDB = require("./config/database");
const UserModel = require("./models/user") 

const app = express();


app.use(express.json())

app.post("/signup",async (req,res)=>{

    console.log(req.body)
   
  const User = new UserModel(req.body)

  //save data to database
  try{
    await User.save()
    res.send("User Added to DataBase Successfully...!")
  }catch(err){
    res.status(500).send("Bad Request..!",err.message)
  }
        

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




connectDB()
  .then(()=>{
    console.log("DataBase Connected Successfully....!!")
    app.listen(2000,()=>{
    console.log("Server is listing on port 2000 successfully...!")
   })
})
    .catch((err)=>{
        console.log("DataBase not connected Successfully...!!")
    })

