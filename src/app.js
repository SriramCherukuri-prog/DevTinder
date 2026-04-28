const express = require("express"); 

const app = express();



app.get("/user",(req,res)=>{

    try{
            //   throw new Error("Error has Occured..");
            res.send("Hello I am a new User")
    }catch(err){
        if(err){
            res.status(500).send("Some ERROR Please Contact Support Team")
        }
    }
    

    
})


// app.use("/",(err,req,res,next)=>{
//     if(err){
//         res.status(500).send("Something went wrong Bad Request...")
//     }
// })






app.listen(2000,()=>{
    console.log("Server is listing on port 3000 successfully...!")
})