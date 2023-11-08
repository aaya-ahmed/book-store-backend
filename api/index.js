require("dotenv").config()
require("../database/connection/connection.js")
const express=require("express")
const cors = require("cors")

const app=express()
app.use(express.json());
app.use(cors())


app.use(express.static(__dirname))

app.use(express.urlencoded({extended:true}))



const logroutes=require("../routing/log.route.js")
app.use(logroutes)

const userroutes=require("../routing/user.route.js")
app.use("/user",userroutes)

const categoryroutes=require("../routing/category.route.js")
app.use("/category",categoryroutes)

const bookroutes=require("../routing/book.route.js")
app.use("/book",bookroutes)

const commentroutes=require("../routing/comment.route.js")
app.use("/comment",commentroutes)

const cartroutes=require("../routing/cart.route.js")
app.use("/cart",cartroutes)

const authroutes=require("../routing/auth.route.js")
app.use("/auth",authroutes)

app.listen(process.env.port,()=>{console.log("localhost://3000")})