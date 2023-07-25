const multer = require("multer")
const path = require("path")
const fileExt=['.png','.pdf']

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        let myLoc = "public/images"
        if(file.fieldname=="imageuser")myLoc = "public/images/user"
        else if(file.fieldname=="imagebook")myLoc = "public/images/book"
        else{myLoc = "public/books"}
        cb(null, myLoc)
    },
    filename: function(req, file, cb){
        const myName = file.fieldname+"-"+Date.now()+path.extname(file.originalname)
        cb(null, myName)
    }
})
const upload = multer({
    storage,
    limits:{ fileSize: 2000000000 },
    fileFilter: function(req,file, cb){
        const index=fileExt.findIndex(ele=>ele==path.extname(file.originalname))
        if(index==-1)
            return cb(new Error("invalid ext"), false)
        cb(null, true)
    }
})
module.exports = upload