const mongoose = require("mongoose");

//connect

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://sriram_db:test123@ramnamasthenode.grxpzlr.mongodb.net/DevTinder")
}


module.exports =  connectDB

