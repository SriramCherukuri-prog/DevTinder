const mongoose = require("mongoose");

const connectionRequestSchema  = new mongoose.Schema({

    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
          required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type..!`
        }
    }

},{
    timestamps:true
 }
)



//pre Functions it will be called everytime connection request will be save;
connectionRequestSchema.pre("save", async function(){
    const conncectionRequest = this;
    //checking if fromUserId is same as toUserId
    if(conncectionRequest.fromUserId.equals(conncectionRequest.toUserId)){
        throw new Error("Cannot Send Connection Request to Yourself!")
    }
    
})

//Compound indexes

connectionRequestSchema.index({
    fromUserId:1,
    toUserId:1
})

const ConnectionRequestModel = mongoose.model("connectionRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel;