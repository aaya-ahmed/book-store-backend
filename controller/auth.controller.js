const auth=require("../database/models/auth.model")
class authcontroller{
    static add=async(req,res)=>{
        try {
            const data = new auth(req.body)
            await data.save() 
            res.status(200).send({
                status:200,
                message:"added"
            })
        } catch (error) {
            res.status(500).send({
                status:500,
                message:error.message
            })
        }
    }
    static remove=async(req,res)=>{
        try{
            await auth.findOneAndDelete({name:req.body.name})
            res.status(200).send({
                status:200,
                message:"deleted"
            })
        } catch (error) {
            res.status(500).send({
                status:500,
                message:"failed"
            })
        }

    }
}
module.exports=authcontroller