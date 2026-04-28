 const adminAuth = (req,res,next)=>{

      const token = "sriram";

      const isAuthorized = token === "sriram";

      if(!isAuthorized){

        res.status(401).send("Not Authorized.......!")
      }
      else{

        next()
        
      }
}

 const userAuth = (req,res,next)=>{

      const token = "sriram";

      const isAuthorized = token === "sri   ram";

      if(!isAuthorized){

        res.status(401).send("Not Authorized.......!")
      }
      else{

        next()
        
      }
}

module.exports = {
    adminAuth,
    userAuth
}