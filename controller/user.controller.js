const userModel=require("../database/models/user.model.js")
const path=require("path")
const fs = require("fs")
class user{
    static profile=(req,res)=>{
        res.status(200).send({
            Status:200,
            message:"done",
            data: req.user
        })
    }
    static edituser=async(req,res)=>{
        try {
            for (const key in req.body) {
                req.user[key]=req.body[key]
            }
            await req.user.save()
            res.status(200).send({
                status:200,
                message:"update success",
                data:req.user
            })
        } catch (error) {
            res.status(500).send({
                status:500,
                message:"update failed",
                error:error.message
            })
        }

    }
    static deleteuser=async(req,res)=>{
        try {
            await userModel.deleteOne({_id:req.user._id})
            res.status(200).send({
                Status: 200,
                date: req.user,
                message: "account is deleted"
            })
        } catch (error) {
            res.status(500).send({
                Status: 500,
                error:error.message,
                message: "deleted failed"
            })
        }
    }
    static changestatususer=async(req,res)=>{
        try {
            req.user.status=!req.user.status
            await req.user.save()
            res.status(200).send({
                apiStatus: true,
                date: req.user,
                message:"change is done"
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                date:'',
                message: "error is happen"
            })
        }
    }
    static uploadimg=async(req,res)=>{
        try{
            console.log('uploadimg')
            let oldimage=''
            if(req.user.imageuser)oldimage=path.join(__dirname,"../",req.user.imageuser)
            else oldimage=null
            req.user.imageuser = req.file.path
            await req.user.save()
            if(oldimage)fs.unlinkSync(oldimage)
            res.send(req.user)
        }
        catch(e){
            res.send(e.message)
        }  
    }
    static getreport=async(req,res)=>{
        try {
            if(req.user.role=="admin"){
                const report=await userModel.report()
            res.status(200).send({
                status: 200,
                data: report,
                message:"done"
            })
            }
            else{throw new Error("not authorized")} 
        } catch (error) {
            res.status(500).send({
                status: 500,
                date: error.message,
                message:"failed"
            })
        }
    }
    static getallusers=async(req,res)=>{
        try {
            const limit=req.query.limit
            const pagenum=req.query.pagenum
            let  users=await userModel.find({role:'user'}).limit(limit).skip(pagenum)
            let user=users.map(ele=>{
                return {
                    "name": ele.name,
                    "age": ele.age,
                    "email": ele.email,
                    "status": ele.status,
                    "books": ele.books.length,
                }
            })
            res.status(200).send({
                status:200,
                data:user,
                message:"done"
            })
        } catch (error) {
            res.status(500).send({
                status:500,
                data:[],
                message:"falid"
            })
        }
    }
    static getalladmins=async(req,res)=>{
        try {
            const limit=req.query.limit
            const pagenum=req.query.pagenum
            let  users=await userModel.find({role:'admin'}).limit(limit).skip(pagenum*limit)
            let user=users.map(ele=>{
                return {
                    "name": ele.name,
                    "age": ele.age,
                    "email": ele.email,
                    "status": ele.status,
                }
            })
            res.status(200).send({
                status:200,
                data:user,
                message:"done"
            })
        } catch (error) {
            res.status(500).send({
                status:500,
                data:[],
                message:"falid"
            })
        }
    }
}
module.exports=user