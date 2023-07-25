const mongoose=require("mongoose")
const bookmodel=require("./book.model")
const cartSchema=mongoose.Schema({
userId:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
book:[{type:mongoose.Schema.Types.ObjectId,ref:'book'}],
totalprice:{type:Number,default:0},
})
cartSchema.methods.getcart=async function(){
    let cart={
        _id:this._id,
        userId:this.userId,
        book:[],
        totalprice:this.totalprice
    }
    let cartbooks=[]
    for(let i=0;i<this.book.length;i++){
        const temp=await bookmodel.findById(this.book[i])
        cartbooks.push({
            book:temp._id,
            name:temp.name,
            price:temp.price,
            image:temp.imagebook
        })
    }
    cart.book=cartbooks
    return cart
}
cartSchema.methods.calculateprice=async function(type,bookid,totalprice){
    const price=await(await bookmodel.findById(bookid)).price
    if(type=="add"){
        totalprice=totalprice+price
    }
    else if(type=="sub"){
        totalprice=totalprice-price
    }
    return totalprice
}
const cart=mongoose.model("cart",cartSchema)
module.exports=cart