const userModel=require("../database/models/user.model")
const commentModel=require("../database/models/comment.model")
const {ObjectId}=require("mongoose")
class commentcontroller{
    static createcomment=async(req,res)=>{
        try{
        const comment=new commentModel({userid:req.user._id,...req.body})
        await comment.save()
        let temp={
            id:comment._id,
            username:req.user.name,
            userimage:req.user.imageuser,
            comment:req.body.commentcontent,
            date:req.body.createdat,
            flag:true
        }
        res.status(200).send({
            status:200,
            data:temp,
            message:"success"
        })
    } catch (error) {
        res.status(500).send({
            status:500,
            error:error.message,
            message:"failed"
        })   
    }
    }
    static getcommentsforbook=async(req,res)=>{
        try {
            let comments=[]
            const comment = await commentModel.find({bookid:req.params.id})
            for(let i=0;i<comment.length;i++){
                let temp= await userModel.findById(comment[i].userid)
                if(req.user._id.equals(temp._id)){
                    comments.push({
                        id:comment[i]._id,
                        username:temp.name,
                        userimage:temp.image,
                        comment:comment[i].commentcontent,
                        date:comment[i].createdat,
                        flag:true
                    })
                }
                else{
                    comments.push({
                        id:comment[i]._id,
                        username:temp.name,
                        userimage:temp.image,
                        comment:comment[i].commentcontent,
                        date:comment[i].createdat
                    })
                }
                
            }
            res.status(200).send({
                status:200,
                data:comments,
                message:"success"
            })
        } catch (error) {
            res.status(500).send({
                status:500,
                error:error.message,
                message:"failed"
            })   
        }
    }
    static removecomment=async(req,res)=>{
        try{
            await commentModel.findByIdAndDelete(req.params.id)
            res.status(200).send({
                status:200,
                data:[],
                message:"success"
            })
        } catch (error) {
            res.status(500).send({
                status:500,
                error:error.message,
                message:"failed"
            })   
        }
    }
    static editcomment=async(req,res)=>{
        try {
            const comment=await commentModel.findById(req.body.id)
            comment.commentcontent=req.body.comment
            await comment.save()
            res.status(200).send({
                status:200,
                data:comment,
                message:"success"
            })
        } catch (error) {
            res.status(500).send({
                status:500,
                error:error.message,
                message:"failed"
            })   
        }
    }
}
module.exports=commentcontroller