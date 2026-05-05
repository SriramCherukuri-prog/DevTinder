const validator = require("validator")

const validateSignUpData = (req)=>{

    const {firstName,lastName,emailid,password} = req.body

    if(!firstName || !lastName){
        throw new Error("Name is not Valid..")
    }else if(!validator.isEmail(emailid)){
        throw new Error("EmailID is not valid..")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please Enter a Strong Password..!")
    }

}

module.exports = {
    validateSignUpData 
}