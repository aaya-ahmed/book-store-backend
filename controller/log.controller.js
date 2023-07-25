const userModel=require("../database/models/user.model")
class log{
    static userregister =async (req,res)=>{
        try {
            
            const user=new userModel(req.body)
            await user.save()
            await user.createcart()
            res.status(200).send({
                status:200,
                message:"register success",
                data:user
            })
        } catch (error) {
            res.error(500).send({
                status:500,
                message:"register failed",
                error:error.message,
                data:[]
            })
        }
    }
    static adminregister =async (req,res)=>{
        try {
            
            const user=new userModel(req.body)
            user.role="admin"
            await user.save()
            res.status(200).send({
                status:200,
                message:"register success",
                data:user
            })
        } catch (error) {
            res.status(500).send({
                status:500,
                message:"register failed",
                error:error.message,
                data:[]
            })
        }
    }
    static login=async(req,res)=>{
        try {
            const user =  await userModel.login(req.body.email,req.body.password)
            const token = await user.generatetoken()
            await user.save()
            res.status(200).send({
                status:200,
                message:"login success",
                data:user,
                token:token
            })
        } catch (error) {
            res.status(500).send({
                status:500,
                error:error.message,
                message:"login failed"
            })
        }
    }
    static logout=async(req,res)=>{
        try {
            let index=req.user.tokens.findIndex(ele=>ele.token==req.token)
            if(index!=-1)req.user.tokens.splice(index,1)
            await req.user.save()
            res.status(200).send({
                status:200,
                message:"logout success"
            })
        } catch (error) {
            res.status(500).send({
                status:500,
                message:"logout failed"
            })
        }

    }
    static logoutall=async(req,res)=>{
        try {
            req.user.tokens=[]
            await req.user.save()
            res.status(200).send({
                status:200,
                message:"logout success"
            })
        } catch (error) {
            res.status(500).send({
                status:500,
                message:"logout failed"
            })
        }

    }
}
module.exports=log