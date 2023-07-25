const categoryModel=require("../database/models/category.model")
class categorycontroller{
    static addcategory= async (req,res)=>{
        try {
            const newcategory=new categoryModel(req.body)
            await newcategory.save()
            res.status(200).send({
                status:200,
                category:newcategory,
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
    static editcategory=async(req,res)=>{
        try {
            const book=await categoryModel.findByIdAndUpdate(req.params.id,{$set:{...req.body}})
            res.status(200).send({
                status:200,
                data:book,
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
    static deletecategory=async (req,res)=>{
        try {
            await categoryModel.deleteOne({_id:req.params.id})
            res.status(200).send({
                status:200,
                message:"category is deleted"
            })
        } catch (error) {
            res.status(500).send({
                status:500,
                error:error.message,
                message:"failed"
            }) 
        }
    }
    static showcategory= async (req,res)=>{
        try {
            const newcategory=await categoryModel.findById(req.params.id)
            if(!newcategory) throw new Error("not exist")
            res.status(200).send({
                status:200,
                category:newcategory,
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
    static showallcategorys= async (req,res)=>{
        try {
            const limit=req.query.limit
            const pagenum=req.query.pagenum
            const length=await categoryModel.count()
            const newcategory=await categoryModel.find().limit(limit).skip(pagenum*limit)
            if(!newcategory) throw new Error("no categorys")
            res.status(200).send({
                status:200,
                category:newcategory,
                length:length,
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

module.exports=categorycontroller