const mongoose=require("mongoose")
const jwt =require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const cartmodel=require("./cart.model")
const commentmodel=require('./comment.model')
const bookmodel=require("./book.model")
const categorymodel=require("./category.model")
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:10
    },
    age:{
        type:Number,
        required:true,
        min:10
    },
    imageuser:{type:String},
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    status:{
        type:Boolean,
        default:true
    },
    tokens:[
        {
            token:{
                type:String,
                trim:true}
        }
    ],
    books:[
        {id:{type: mongoose.Schema.Types.ObjectId, ref: 'book' },
         like:{type:Boolean}
    }],
    cart:{type: mongoose.Schema.Types.ObjectId, ref: 'cart' }
})
userSchema.pre("save", async function(){
    const data=this
    if(data.isModified("password")){
        data.password = await bcrypt.hash(data.password,5)
    }
})
userSchema.pre("deleteOne",async function(){
    const data=this
    await cartmodel.findOneAndDelete({userId:data._id})
    await commentmodel.deleteMany({userid:data._id})
})
userSchema.methods.toJSON = function(){
    const userData = this.toObject()
    delete userData.tokens
    return userData
}
userSchema.statics.login=async (email,pass)=>{
    const userdata=await user.findOne({email})
    if(!userdata) throw new Error ("invalid email")
    if(!userdata.status) throw new Error ("this account not active")
    const isValid = await bcrypt.compare(pass,userdata.password)
    if(!isValid) throw new Error ("invalid password")
    return userdata
}
userSchema.methods.generatetoken=async function(){
    const userdata = this
    if(userdata.tokens.length==5)throw new Error("can't login from more than 5 devices")
    const token=jwt.sign({_id:userdata._id},process.env.secretkey)
    userdata.tokens=userdata.tokens.concat({token})
    await userdata.save()
    return token
}
userSchema.methods.createcart=async function(){
    const userdata=this
    const cart=new cartmodel({userId:userdata._id})
    await cart.save()
}
userSchema.statics.report=async function(){
    let report={
        numberofbooks: (await bookmodel.find()).length,
        numberofcategory: (await categorymodel.find()).length,
        numberofusers: (await user.find()).length
    }
    return report
}    

const user=mongoose.model("user",userSchema)
module.exports=user
