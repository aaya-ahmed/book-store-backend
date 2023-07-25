const mongoose=require("mongoose")
const book=require("./book.model.js")
const categorySchema=mongoose.Schema({
name:{
    type:String,
    required:true,
    unique:true
}
})
categorySchema.pre('deleteOne',async function(){
 const categoryid=this._conditions._id
 await book.deleteMany({categoryId:categoryid})
})
const category=mongoose.model("category",categorySchema)
module.exports=category