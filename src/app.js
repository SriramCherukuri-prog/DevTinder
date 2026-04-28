const express = require("express"); 

const app = express();

const {adminAuth,userAuth} = require("./Middlewares/auth")


app.use("/admin",adminAuth)

// app.use("/user",userAuth) 

app.get("/admin/getAllUsersData",(req,res)=>{
    //Logic of all data fetching
       res.send("All Data Sent")
 
})

app.get("/user",userAuth,(req,res,next)=>{
    res.send("User Data sent Sucessfully...!!!!")
})

app.get("/admin/delData",(req,res)=>{
    
    res.send("Data has been deleted..!")
})





app.listen(2000,()=>{
    console.log("Server is listing on port 3000 successfully...!")
})