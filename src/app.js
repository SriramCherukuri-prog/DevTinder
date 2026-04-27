const express = require("express"); 

const app = express();


app.get("/user",(req,res)=>{
    res.send({firstname:"Sriram",lastname:"Cherukuri"})
})

app.post("/user",(req,res)=>{
    res.send("Data Saved to DataBase Successfully")
})

app.delete("/user",(req,res)=>{
    res.send("user deleted Successfully")
})


app.listen(2000,()=>{
    console.log("Server is listing on port 3000 successfully...!")
})