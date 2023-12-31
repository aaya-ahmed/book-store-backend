const mongoose=require("mongoose")
const bookSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        minlength:3,
        maxlength:35
    },
    description:{
        type:String,
        required:true,
        trim:true,
        minlength:100,
        maxlength:1000
    },
    imagebook:{
        type:String
    },
    //
    author:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:20
    },
    //
    createdat:{
        type:Date,
        default:Date.now()
    },
    content:{
        type:String
    },
    price:{
        type:Number,
        required:true,
        min:10
    },
    numberoflikes:{
        type:Number,
        default:0
    },
    numberofdislikes:{
        type:Number,
        default:0
    },
    numberofbuys:{type:Number,default:0},
    categoryId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"category"}
})
const book=mongoose.model("book",bookSchema)
module.exports=book