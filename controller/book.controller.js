const bookModel=require("../database/models/book.model.js")
const usermodel=require("../database/models/user.model.js")
const path=require("path")
const fs=require("fs")

class bookcontroller{
    static addbook= async (req,res)=>{
        try {
                const newbook=new bookModel(req.body)
                await newbook.save()
                res.status(200).send({
                    status:200,
                    book:newbook,
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
    static editbook=async (req,res)=>{
        try {
            await bookModel.findByIdAndUpdate(req.body._id,req.body)
            res.status(200).send({
                status:200,
                book:req.body,
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
    static deletebook=async (req,res)=>{
        try {
            await bookModel.findByIdAndDelete(req.params.id)
            const user=await usermodel.findById(req.user._id)
            const index=user.books.findIndex(ele=>ele.id==req.params.id)
            if(index!=-1){
                user.book.splice(index,1)
                await user.save()
            }
                res.status(200).send({
                    status:200,
                    message:"book is deleted"
                })
        } catch (error) {
            res.status(500).send({
                status:500,
                error:error.message,
                message:"failed"
            }) 
        }
    }
    static showbook= async (req,res)=>{
        try {
            
            let newbook=await bookModel.findById(req.params.id)
            let temp={userlike:0,...newbook._doc}
            if(!newbook) throw new Error("not exist")
            const user=await usermodel.findById(req.user._id)
            let index=user.books.findIndex(ele=>ele.id==req.params.id)
            if(index==-1){
                temp.content=""
            }
            else{
                temp['userlike']=user.books[index].like
            }
            res.status(200).send({
                status:200,
                book:temp,
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
    static showallbooks=async(req,res)=>{
        try {
            let length=await bookModel.count()
            let pagelimit=req.query.limit
            let pagenum=req.query.pagenum
            let newbook=await bookModel.find().limit(pagelimit).skip(pagelimit*pagenum)
            if(!newbook) throw new Error("not exist")
            res.status(200).send({
                status:200,
                book:newbook,
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
    static showbookglobal= async (req,res)=>{
        try {
            const length=await bookModel.count()
            const limit=parseInt(req.query.pagelimit)
            const pagenum=parseInt(req.query.pagenum)
            let books=await bookModel.find().limit(limit).skip(pagenum*limit)
            if(!books) throw new Error("no books")
            books=books.map(ele=>{
                const {$__,$isNew,_doc:{content,...result}}=ele
                return result
            })
            res.status(200).send({
                status:200,
                book:books,
                message:"success",
                length:length
            })
        } catch (error) {
            res.status(500).send({
                status:500,
                error:error.message,
                message:"failed"
            }) 
        }
    }
    static getBooksByCategory=async(req,res)=>{
        try {
            const limit=req.query.pagelimit||20
            const page=req.query.pagenum
            const temp=await bookModel.find({categoryId:req.params.id}).limit(limit).skip(page*limit)
            let books=[]
            if(!temp) throw new Error("not exist")
            for(let i=0;i<temp.length;i++){
                let book={_id:temp[i]._id  ,
                          name:temp[i].name  ,
                          imagebook:temp[i].imagebook  ,
                          author:temp[i].author  ,
                          price:temp[i].price  ,
                          numberoflikes:temp[i].numberoflikes,
                          numberofdislikes:temp[i].numberofdislikes,
                          numberofbuys:temp[i].numberofbuys
                        }
                books.push(book)
            }
            res.status(200).send({
                status:200,
                book:books,
                page:page,
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
    static getuserbook=async(req,res)=>{
        let books=[]
        try {
            for(let i=0;i<req.user.books.length;i++){
                const book=await bookModel.findById(req.user.books[i].id)
                books.push(book)
            }
            console.log(books)
            res.status(200).send({
                Status: 200,
                data: books,
                message: "no books"
            })
        } catch (error) {
            res.status(500).send({
                Status: 500,
                error:error.message,
                message: "failed"
            })
        }
    }
    static getbookbyname=async(req,res)=>{
        try {
                const book=await (await bookModel.find()).filter(ele=>{
                    return ele.name.toLowerCase().includes(req.params.name.toLowerCase())?true:false
                })


            res.status(200).send({
                Status: 200,
                data: book,
                message: "no books"
            })
        } catch (error) {
            res.status(500).send({
                Status: 500,
                error:error.message,
                message: "failed"
            })
        }
    }
    static increasenumberoflike=async(req,res)=>{
        try {
            const book=await req.user.books.find(ele=>ele.id.toString()==req.body.bookid)
            if(!book) throw new Error("you don't buy this book")
            const tempbook=await bookModel.findById(req.body.bookid)

            if(book.like==true){ throw new Error("you liked this book")}
            else if(book.like==false){
                tempbook.numberoflikes++
                tempbook.numberofdislikes--
            }
            else{
            tempbook.numberoflikes++
        }
            await tempbook.save()
            let index=req.user.books.findIndex(ele=>ele.id==req.params.bookid)
            book.like=true
            req.user.books[index]=book
            await req.user.save()
            res.status(200).send({
                status:200,
                data:{numberoflikes:tempbook.numberoflikes,
                    numberofdislikes:tempbook.numberofdislikes,
                },
                message:"liked is added"
            })
        } catch (error) {
            res.status(500).send({
                status:500,
                error:error.message,
                message:"failed"
            })
        }
    }
    static dcreasenumberoflike=async(req,res)=>{
        try {
            const book=await req.user.books.find(ele=>ele.id.toString()==req.body.bookid)
            if(!book) throw new Error("you don't buy this book")
            const tempbook=await bookModel.findById(req.body.bookid)
            if(book.like==false){ throw new Error("you disliked this book")}
            else if(book.like==true){
                tempbook.numberoflikes--
                tempbook.numberofdislikes++
            }
            else{
            tempbook.numberofdislikes++
        }
            await tempbook.save()
            let index=req.user.books.findIndex(ele=>ele.id==req.params.bookid)
            book.like=false
            req.user.books[index]=book
            await req.user.save()
            res.status(200).send({
                status:200,
                data:{numberoflikes:tempbook.numberoflikes,
                    numberofdislikes:tempbook.numberofdislikes,
                },
                message:"disliked is added"
            })
        } catch (error) {
            res.status(500).send({
                status:500,
                error:error.message,
                message:"failed"
            })
        }
    }
    static uploadimg=async(req,res)=>{
        try{
            const book=await bookModel.findById(req.params.id)
            let oldimage=''
            if(book.imagebook)oldimage=path.join(__dirname,"../",book.imagebook)
            else oldimage=null
            book.imagebook = req.file.path
            await book.save()
            console.log(1)
            if(oldimage)fs.unlinkSync(oldimage)
            res.status(200).send({
                status:200,
                data:book,
                message:"success"
            })
        }
        catch(e){
            res.status(500).send({
                status:500,
                data:e.message,
                message:"failed"
            })
        }
    }
    static addcontent=async(req,res)=>{
        try{
            const book=await bookModel.findById(req.params.id)
            let oldbook=''
            if(book.content)oldbook=path.join(__dirname,"../",book.content)
            else oldbook=null
            book.content = req.file.path
            await book.save()
            if(oldbook)fs.unlinkSync(oldbook)
            res.status(200).send({
                status:200,
                data:book,
                message:"success"})
        }
        catch(error){
            res.status(400).send({
                status:400,
                data:error.message,
                message:"failed"})
        }
    }
}

module.exports=bookcontroller