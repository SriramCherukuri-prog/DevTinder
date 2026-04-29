const express = require("express");
const connectDB = require("./config/database");
const UserModel = require("./models/user") 
const UserForm = require("./models/form")

const app = express();


app.post("/signup",async (req,res)=>{
   
    const userObj = {
        firstName:"Virat",
        lastName:"Kholi",
        emaiId:"Virat18@gmail.com",
        password:"Virat@18"
    }

     const user = new UserModel(userObj)

     //Save Data
    await user.save() 
    
    res.send("User Added Successfully....!")

})

app.post("/form",async (req,res)=>{
    const formObj = {
        name:"RohitSharma",
        age:39,
        designation:"Cricketer"
    }

    const formData = new UserForm(formObj)
    
    await formData.save()
    res.send("FormData Added Successfully..!!")
     
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

