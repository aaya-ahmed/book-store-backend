const mongoose=require("mongoose")
const OBJECT_ID = mongoose.Schema.Types.ObjectId;

const commentsSchema=mongoose.Schema({
userid:{type: OBJECT_ID, ref: 'user' },
bookid:{type: OBJECT_ID, ref: 'book' },
commentcontent:{
    type:String,
    trim:true,
    minlength:5
},
createdat:{
    type:Date,
    default:Date.now()
}
})
const comments=mongoose.model("comments",commentsSchema)
module.exports=comments