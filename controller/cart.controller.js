const cartModel=require("../database/models/cart.model.js")
const bookmodel=require("../database/models/book.model.js")
class cartcontroller{
    static addtocart=async(req,res)=>{
        try {
            const cart=await cartModel.findOne({userId:req.user._id})
            if(cart.book.findIndex(ele=>ele==req.body.bookId)!=-1)throw new Error("this book in cart")
            if(req.user.books.findIndex(ele=>ele.id==req.body.bookId)!=-1)throw new Error("already you buy this book")
            cart.book.push(req.body.bookId)
            cart.totalprice=await cart.calculateprice("add",req.body.bookId,cart.totalprice)
            await cart.save()
            res.status(200).send({
                status:200,
                data:cart,
                message:"added"
            })
        } catch (error) {
            res.status(500).send({
                status:500,
                error:error.message,
                message:"failed"
            }) 
        }
    }
    static deletefromcart=async (req,res)=>{
        try {
            const cart=await cartModel.findOne({userId:req.user._id})
            let index=cart.book.findIndex(ele=>ele==req.params.id)
            if(index==-1)throw new Error("this book is not founded")
            cart.book.splice(index,1)
            cart.totalprice=await cart.calculateprice("sub",req.params.id,cart.totalprice)
            await cart.save()
            res.status(200).send({
                status:200,
                message:"cart is deleted"
            })
        } catch (error) {
            res.status(500).send({
                status:500,
                error:error.message,
                message:"failed"
            }) 
        }
    }
    static showcart= async (req,res)=>{
        try {
            let newcart=await cartModel.findOne({userId:req.user._id})
            if(!newcart) throw new Error("not exist")
            const cart=await newcart.getcart()
            res.status(200).send({
                status:200,
                data:cart,
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
    static buy=async(req,res)=>{
        try {
            const cart=await cartModel.findById(req.body._id)
            for(let i=0;i<cart.book.length;i++){
                req.user.books.push({id:cart.book[i].toString()})
                const book=await bookmodel.findById(cart.book[i].toString())
                book.numberofbuys++
                 await book.save()
            }
            await req.user.save()
            cart.book=[]
            cart.totalprice=0
            await cart.save()
            res.status(200).send({
                status:200,
                data:cart,
                message:"done"
            })
        } catch (error) {
            res.status(500).send({
                status:500,
                data:[],
                message:"failed"
            })
        }

    }
     
}

module.exports=cartcontroller