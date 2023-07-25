const userModel=require("../database/models/user.model.js")
const authmodel=require("../database/models/auth.model.js")
const jwt=require("jsonwebtoken")
const authorization=async (req,res,next)=>{
    try{
            const token=req.header("Authorization").replace("Bearer ","")
            const decode=jwt.verify(token,process.env.secretkey)
            user=await userModel.findById({_id:decode._id,'tokens.token':token})
            if(!user) throw new Error("invalid user")
            req.user=user
            req.token=token
            next()
            
    }
    catch(error){
        res.status(500).send({
            apiStatus:false,
            date:error.message,
            message:"not authorized"
        })
    }
}
module.exports=authorization