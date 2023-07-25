const book=require("../controller/book.controller.js")
const authorization = require("../middleware/authorization.js")
const router=require("express").Router()
const upload = require("../middleware/upload")

router.post("/addbook",authorization,book.addbook)
router.post('/uploadbookimg/:id',authorization,upload.single('imagebook'),book.uploadimg)
router.post('/addcontent/:id',authorization,upload.single('book'),book.addcontent)
router.post("/addlike",authorization,book.increasenumberoflike)
router.post("/adddislike",authorization,book.dcreasenumberoflike)
router.patch("/editbook/:id",authorization,book.editbook)
router.delete("/deletebook/:id",authorization,book.deletebook)
router.get("/getbook/:id",authorization,book.showbook)
router.get("/getbookbyname/:name",authorization,book.getbookbyname)
router.get("/allbooks",authorization,book.showbookglobal)
router.get("/books",authorization,book.showallbooks)
router.get("/allbooksbycatgeory/:id",authorization,book.getBooksByCategory)
router.get("/getuserbook",authorization,book.getuserbook)



module.exports=router
