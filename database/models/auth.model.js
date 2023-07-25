const mongoose=require("mongoose")
const authSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    role:[{
        type:String
    }]
})
const auth=mongoose.model("auth",authSchema)
module.exports=auth
