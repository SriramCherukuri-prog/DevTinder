const jwt  = require("jsonwebtoken");
const UserModel = require("../models/user") 

 const userAuth = async (req,res,next)=>{
        
  try{
   
  //Server reads cookie using cookie-parser
   const {token} =  req.cookies 

   //Token Validation
   const isTokenValid = jwt.verify(token,"Sriram@123")

   //If token is not valid
   if(!isTokenValid){
    throw new Error("Token is Invalid... Please Login...")
   }

   const {_id} = isTokenValid;
  
  //if Id is exist in DataBase it gives user profile data...
  const userData = await UserModel.findById({_id})

   //if token is valid then  user does not exit..
  if(!userData){
    throw new Error("Data Not Found")
  }

  //Attaching my userData to request Object
  req.userData = userData

  next();

  }catch(err){
    res.status(400).send("ERROR OCCURED:" + err.message)
  }

}

module.exports = {
  userAuth
}