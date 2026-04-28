const express = require("express"); 

const app = express();


app.use("/user",(req,res,next)=>{
      
    // res.send("Response....!")
    next()
    
},
(req,res)=>{
    res.send("response2")
}
)



app.listen(2000,()=>{
    console.log("Server is listing on port 3000 successfully...!")
})