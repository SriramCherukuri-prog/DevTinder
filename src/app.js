const express = require("express"); 

const app = express();


app.use("/hello",(req,res)=>{
     res.send("Hello from the server!")
})

app.use("/",(req,res)=>{
    res.send("Hello from the Welcome Home Page")
})


app.listen(2000,()=>{
    console.log("Server is listing on port 3000 successfully...!")
})