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

