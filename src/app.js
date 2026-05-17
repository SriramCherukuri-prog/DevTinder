const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser")
const cors = require('cors')

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");



const app = express();

//middlewares we can used for all the routes then we use app.use()
app.use(cors())
app.use(express.json())
app.use(cookieParser())



app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

connectDB()
  .then(()=>{
    console.log("DataBase Connected Successfully....!!")
    app.listen(2000,()=>{
    console.log("Server is listing on port 2000 successfully...!")
   })
}).catch((err)=>{
        console.log("DataBase not connected Successfully...!!")
    })

